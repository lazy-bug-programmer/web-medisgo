const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const fetch = require("node-fetch");
const { Client, Databases, Storage, ID } = require("node-appwrite");
const FormData = require("form-data");
require("dotenv").config({ path: path.join(__dirname, "../../.env.local") });

const DATABASE_ID = "Core";
const DOCTORS_COLLECTION_ID = "doctors_1";
const STORAGE_BUCKET_ID = "Core";
const TARGET_HOSPITAL = "George Town Specialist Hospital Penang";

// Validate environment variables
const requiredEnvVars = [
  "NEXT_PUBLIC_APPWRITE_URL",
  "NEXT_PUBLIC_APPWRITE_PROJECT",
  "NEXT_PRIVATE_APPWRITE_KEY",
];

const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingVars.length > 0) {
  console.error("❌ Missing required environment variables:");
  missingVars.forEach((varName) => {
    console.error(`   - ${varName}`);
  });
  console.error(
    "\nPlease make sure you have a .env.local file with all required variables."
  );
  console.error(
    "Current .env.local path:",
    path.join(__dirname, "../../.env.local")
  );
  process.exit(1);
}

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
  .setKey(process.env.NEXT_PRIVATE_APPWRITE_KEY);

const databases = new Databases(client);
const storage = new Storage(client);

// Helper function to normalize names for matching
function normalizeName(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[^\w\s]/g, "");
}

// Helper function to check if doctor is from target hospital
function isFromTargetHospital(address) {
  const normalizedAddress = normalizeName(address || "");
  const normalizedTarget = normalizeName(TARGET_HOSPITAL);
  return normalizedAddress.includes(normalizedTarget);
}

// Helper function to parse HTML and extract doctor data
function parseHtmlDoctors(htmlContent) {
  const doctorsMap = new Map();

  // Georgetown Specialist Hospital uses Elementor layout
  // Structure: <img> followed by <h1>Dr. Name</h1>
  // We need to find image-name pairs in the HTML

  // Find all sections with doctor images and names
  const regex =
    /<img[^>]*src="([^"]+)"[^>]*>[\s\S]{0,500}?<h1>Dr\.\s*([^<]+)<\/h1>/gi;
  let match;

  while ((match = regex.exec(htmlContent)) !== null) {
    const imageUrl = match[1];
    const doctorName = match[2].trim();

    if (imageUrl && doctorName) {
      doctorsMap.set(normalizeName(doctorName), imageUrl);
      console.log(`  Found in HTML: ${doctorName} -> ${imageUrl}`);
    }
  }

  return doctorsMap;
}

// Helper function to find doctor image from HTML data
function findDoctorImageUrl(firstName, lastName, doctorsMap) {
  const fullName = normalizeName(`${firstName} ${lastName}`);

  // Try exact match with "Dr."
  const withDr = normalizeName(`${firstName} ${lastName} Dr.`);
  if (doctorsMap.has(withDr)) {
    return doctorsMap.get(withDr);
  }

  // Try without Dr.
  if (doctorsMap.has(fullName)) {
    return doctorsMap.get(fullName);
  }

  // Try partial match
  const normalizedFirst = normalizeName(firstName);
  const normalizedLast = normalizeName(lastName);

  for (const [name, imageUrl] of doctorsMap.entries()) {
    if (name.includes(normalizedFirst) && name.includes(normalizedLast)) {
      return imageUrl;
    }
  }

  return null;
}

// Helper function to download and upload image to Appwrite
async function downloadAndUploadImage(imageUrl, doctorName) {
  try {
    // Use full URL if already absolute, otherwise build it
    const fullUrl = imageUrl.startsWith("http")
      ? imageUrl
      : `https://georgetownspecialist.com${imageUrl}`;

    console.log(`  Downloading image from: ${fullUrl}`);

    const response = await fetch(fullUrl);
    if (!response.ok) {
      console.log(`  Failed to download image: ${response.statusText}`);
      return null;
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract file extension from URL
    const urlPath = fullUrl.split("?")[0];
    const ext = path.extname(urlPath) || ".jpg";
    const fileName = `${doctorName.replace(/\s+/g, "_")}_${Date.now()}${ext}`;

    console.log(`  Uploading to Appwrite storage as: ${fileName}`);

    // Upload to Appwrite using createFile with InputFile
    const { InputFile } = require("node-appwrite/file");
    const inputFile = InputFile.fromBuffer(buffer, fileName);

    const uploadedFile = await storage.createFile(
      STORAGE_BUCKET_ID,
      ID.unique(),
      inputFile
    );

    console.log(`  ✓ Uploaded successfully. File ID: ${uploadedFile.$id}`);
    return uploadedFile.$id;
  } catch (error) {
    console.error(`  Error downloading/uploading image:`, error);
    return null;
  }
}

// Helper function to parse JSON string with proper error handling
function parseJSONField(value, defaultValue = null) {
  if (!value || value.trim() === "") {
    return defaultValue;
  }

  try {
    // Fix malformed JSON strings from CSV
    let cleaned = value
      .replace(/^"+/, "")
      .replace(/"+$/, "")
      .replace(/""/g, '"')
      .replace(/;/g, ",");

    // Try to fix the format - convert {key:value} to {"key":"value"}
    cleaned = cleaned.replace(/\{(\w+):/g, '{"$1":');
    cleaned = cleaned.replace(/:(\w+)/g, ':"$1"');
    cleaned = cleaned.replace(/,(\w+):/g, ',"$1":');

    return JSON.parse(cleaned);
  } catch (error) {
    console.error(`Error parsing JSON field: ${value}`);
    return defaultValue;
  }
}

// Main import function
async function importDoctors() {
  const csvFilePath = path.join(__dirname, "./Island and Gleangles Penang.csv");
  const htmlFilePath = path.join(__dirname, "./res.html");

  // Read HTML file
  console.log("Reading HTML file...");
  const htmlContent = fs.readFileSync(htmlFilePath, "utf-8");
  const doctorsMap = parseHtmlDoctors(htmlContent);
  console.log(`Found ${doctorsMap.size} doctors in HTML file`);

  const allDoctors = [];

  // Read CSV file
  console.log("\nReading CSV file...");
  await new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (row) => {
        allDoctors.push(row);
      })
      .on("end", () => {
        resolve();
      })
      .on("error", reject);
  });

  console.log(`Found ${allDoctors.length} total doctors in CSV file`);

  // Filter doctors from George Town Specialist Hospital Penang
  const doctors = allDoctors.filter((doctor) =>
    isFromTargetHospital(doctor.Address)
  );

  console.log(
    `Filtered to ${doctors.length} doctors from ${TARGET_HOSPITAL}\n`
  );

  if (doctors.length === 0) {
    console.log(`No doctors found from ${TARGET_HOSPITAL}. Exiting.`);
    return;
  }

  let successCount = 0;
  let errorCount = 0;
  let imageFoundCount = 0;
  let skippedCount = allDoctors.length - doctors.length;

  // Process each doctor
  for (let i = 0; i < doctors.length; i++) {
    const doctor = doctors[i];
    const doctorName = `${doctor["First Name"]} ${doctor["Last Name"]}`;

    console.log(`\n[${i + 1}/${doctors.length}] Processing: ${doctorName}`);
    console.log(`  Hospital: ${doctor.Address}`);

    try {
      // Find matching image URL from HTML
      const imageUrl = findDoctorImageUrl(
        doctor["First Name"],
        doctor["Last Name"],
        doctorsMap
      );

      let photoFileId = "";

      if (imageUrl) {
        console.log(`  ✓ Found image URL: ${imageUrl}`);
        imageFoundCount++;

        // Download and upload image
        const uploadedFileId = await downloadAndUploadImage(
          imageUrl,
          doctorName
        );
        if (uploadedFileId) {
          photoFileId = uploadedFileId;
        }
      } else {
        console.log(`  ✗ No image found for this doctor`);
      }

      // Parse languages and working hours
      const languages = parseJSONField(doctor.Languages, []);
      const workingHours = parseJSONField(doctor["Working Hours"], {});

      // Determine gender enum value (0 = MALE, 1 = FEMALE, 2 = OTHERS)
      let gender = 0; // Default to MALE
      if (doctor.Gender && doctor.Gender.toUpperCase() === "FEMALE") {
        gender = 1;
      } else if (doctor.Gender && doctor.Gender.toUpperCase() === "OTHERS") {
        gender = 2;
      }

      // Determine status enum value (0 = ACTIVE, 1 = INACTIVE, 2 = ON_LEAVE, 3 = RETIRED)
      let status = 0; // Default to ACTIVE
      const statusUpper = (doctor.Status || "ACTIVE").toUpperCase();
      if (statusUpper === "INACTIVE") {
        status = 1;
      } else if (statusUpper === "ON_LEAVE" || statusUpper === "ON LEAVE") {
        status = 2;
      } else if (statusUpper === "RETIRED") {
        status = 3;
      }

      // Create doctor in Appwrite
      console.log(`  Creating doctor record in Appwrite...`);
      const newDoctor = await databases.createDocument(
        DATABASE_ID,
        DOCTORS_COLLECTION_ID,
        ID.unique(),
        {
          photo_url: photoFileId,
          first_name: doctor["First Name"] || "",
          last_name: doctor["Last Name"] || "",
          email: doctor.Email || "",
          phone: doctor.Phone || "",
          dob: new Date("1980-01-01").toISOString(), // Default DOB since not in CSV
          gender: gender,
          address: doctor.Address || "",
          specialty: doctor.Specialty || "",
          department: doctor.Department || "",
          medical_license_number: doctor["Medical License Number"] || "",
          years_of_experience: parseInt(doctor["Years of Experience"]) || 0,
          status: status,
          education_and_training: doctor["Education and Training"] || "",
          biography: doctor.Biography || "",
          languages: JSON.stringify(languages),
          working_hours: JSON.stringify(workingHours),
        }
      );

      console.log(`  ✓ Successfully created doctor: ${newDoctor.$id}`);
      successCount++;
    } catch (error) {
      console.error(`  ✗ Error processing doctor:`, error.message);
      errorCount++;
    }
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("IMPORT SUMMARY");
  console.log("=".repeat(60));
  console.log(`Target Hospital: ${TARGET_HOSPITAL}`);
  console.log(`Total doctors in CSV: ${allDoctors.length}`);
  console.log(`Doctors from target hospital: ${doctors.length}`);
  console.log(`Skipped (other hospitals): ${skippedCount}`);
  console.log(`Successfully imported: ${successCount}`);
  console.log(`Failed: ${errorCount}`);
  console.log(`Images found: ${imageFoundCount}`);
  console.log(`Images not found: ${doctors.length - imageFoundCount}`);
  console.log("=".repeat(60));
}

// Run the import
importDoctors()
  .then(() => {
    console.log("\n✓ Import completed!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n✗ Import failed:", error);
    process.exit(1);
  });
