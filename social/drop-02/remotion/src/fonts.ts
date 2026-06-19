import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadOpenSans } from "@remotion/google-fonts/OpenSans";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";

// Load italic faces for Playfair (used by all display type)
loadPlayfair("italic", { weights: ["400", "500"], subsets: ["latin"] });
export const PLAYFAIR = loadPlayfair("normal", { weights: ["400", "500"], subsets: ["latin"] }).fontFamily;
export const OPENSANS = loadOpenSans("normal", { weights: ["300", "400", "600", "700"], subsets: ["latin"] }).fontFamily;
export const MONO = loadMono("normal", { weights: ["400", "500"], subsets: ["latin"] }).fontFamily;
