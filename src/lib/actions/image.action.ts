"use server";

export async function downloadImageFromUrl(
  imageUrl: string,
  fileName: string
): Promise<{ success: boolean; file?: File; error?: string }> {
  try {
    console.log(`Server: Downloading image from ${imageUrl}`);

    const response = await fetch(imageUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept: "image/*,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        DNT: "1",
        Connection: "keep-alive",
        "Upgrade-Insecure-Requests": "1",
      },
    });

    if (!response.ok) {
      console.error(
        `Failed to download image: ${imageUrl} - Status: ${response.status}`
      );
      return {
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    const arrayBuffer = await response.arrayBuffer();
    const contentType = response.headers.get("content-type") || "image/jpeg";

    // Validate that we got an image
    if (!contentType.startsWith("image/")) {
      console.error(`Downloaded file is not an image: ${contentType}`);
      return {
        success: false,
        error: `Invalid content type: ${contentType}`,
      };
    }

    // Create a File object from the array buffer
    const blob = new Blob([arrayBuffer], { type: contentType });
    const file = new File([blob], fileName, { type: contentType });

    console.log(
      `Server: Successfully downloaded image: ${fileName} (${contentType}, ${arrayBuffer.byteLength} bytes)`
    );

    return {
      success: true,
      file,
    };
  } catch (error) {
    console.error(`Server: Error downloading image: ${imageUrl}`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
