# Create the public directory if it doesn't exist
mkdir -p public

# Copy the SVG icon to the public directory
# (You'll need to manually create this file first from the SVG content I provided)

# Generate different sizes using individual commands
npx sharp public/icon.svg -o public/favicon.ico --resize 32
npx sharp public/icon.svg -o public/apple-touch-icon.png --resize 180
npx sharp public/icon.svg -o public/android-chrome-192x192.png --resize 192
npx sharp public/icon.svg -o public/android-chrome-512x512.png --resize 512