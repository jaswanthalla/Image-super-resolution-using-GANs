# Image Super-Resolution Demo

This project is a front-end web application designed to demonstrate the concepts of image super-resolution. It provides an interactive interface to compare low-resolution images with their high-resolution counterparts, simulating the output of a GAN-based model like ESRGAN. Users can select from a gallery of demo images or upload their own to see a (simulated) enhancement and review image quality metrics.

## Features

* **Interactive Image Comparison**: A slider component to visually compare "Low Resolution" and "High Resolution" images side-by-side.
* **Demo Gallery**: A selection of pre-defined image pairs (landscapes, portraits, etc.) to demonstrate the concept.
* **Image Upload**: A drag-and-drop (or click-to-select) area for users to upload their own images.
* **Image Quality Metrics**:
    * **PSNR (Peak Signal-to-Noise Ratio)**: Calculates and displays the PSNR value, a common metric for image reconstruction quality.
    * **SSIM (Structural Similarity Index)**: Calculates and displays the SSIM value, which measures the similarity between two images.
* **Simulated Processing**: Displays a processing time and metrics to mimic a real model's performance.
* **Model Info**: Shows static information about the simulated model (e.g., "ESRGAN", "4x Upscale").
* **Responsive Design**: Built with Tailwind CSS for a modern, responsive user interface.

## Tech Stack

* **Vite**: High-performance build tool and dev server.
* **React**: A JavaScript library for building user interfaces.
* **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
* **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
* **Lucide-React**: A set of clean and beautiful icons.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v18 or later recommended)
* npm (or yarn/pnpm)

## How It Works

This application *simulates* image super-resolution to demonstrate the *concepts* and *metrics* involved. It does not contain a real,-time super-resolution model.

1.  **State Management**: The main `App.tsx` component manages the application state, including the `selectedImage`, calculated `metrics`, and `processingTime`.
2.  **Image Selection**: A user can select an `ImagePair` from the `DemoGallery` or upload a file via `UploadSection`.
3.  **Metrics Calculation**:
    * When an image is selected, the `processImages` function in `App.tsx` is called.
    * This function uses the `getImageData` utility (from `src/utils/imageMetrics.ts`) to load both the `lowRes` and `highRes` images onto a `<canvas>` element. This allows it to read their raw pixel `ImageData`.
    * The `calculatePSNR` and `calculateSSIM` functions are then called to compute the mathematical difference between the two images.
4.  **Display**:
    * `ImageComparison` component receives both the `lowResImage` and `highResImage` URLs and displays them in the interactive slider.
    * `MetricsDisplay` receives the computed `metrics` and `processingTime` and formats them for the user.
5.  **Upload Handling**: When a user uploads their own image, the application sets it as *both* the `lowRes` and `highRes` source. This is a placeholder for a real model. In this case, the `calculatePSNR` and `calculateSSIM` functions will (correctly) report near-perfect scores, as they are comparing the image to itself.

## Future Improvements

* **Integrate a Real Model**: Use a JavaScript-based deep learning library (like TensorFlow.js or ONNX.js) to load and run a lightweight super-resolution model (e.g., a mobile-optimized ESRGAN) directly in the browser.
* **Implement Zoom**: Wire up the Zoom In/Out buttons in the `ImageComparison` component to add panning and zooming functionality for a more detailed inspection.
* **Web Workers**: Offload the model inference and/or image metric calculations to a Web Worker to prevent blocking the main UI thread during processing.

## Acknowledgments

* Demo images provided by [Pexels](https://www.pexels.com/).
* Icons provided by [Lucide-React](https://lucide.dev/).

