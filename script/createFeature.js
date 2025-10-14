const fs = require("fs");
const path = require("path");

// base path
const basePath = path.join(__dirname, "../src", "features");

// folders
const subDirs = ["components", "pages", "services", "hooks", "types", "utils", 'router', 'redux'];

function createFeature(moduleName) {
  const featurePath = path.join(basePath, moduleName);

  if (fs.existsSync(featurePath)) {
    console.log(`❌ Feature "${moduleName}" already exists at ${featurePath}`);
    return;
  }

  // Create main feature folder
  fs.mkdirSync(featurePath, { recursive: true });
  console.log(`📁 Created feature folder: ${featurePath}`);

  // Create subdirectories
  subDirs.forEach((dir) => {
    const subDirPath = path.join(featurePath, dir);
    fs.mkdirSync(subDirPath, { recursive: true });
    console.log(`   ├── 📂 Created subfolder: ${dir}`);
  });

  // Create types.ts file
  const typesFile = path.join(featurePath, "Readme.md");
  fs.writeFileSync(
    typesFile,
    `// Description for ${moduleName} feature\n\nPages \n`
  );
  console.log("   ├── 📄 Created file: types.ts");

  console.log(`✅ Feature "${moduleName}" scaffold created successfully!`);
}

// Capitalize helper
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// CLI input handling
const moduleName = process.argv[2];

if (!moduleName) {
  console.error("⚠️ Please provide a module name. Example:");
  console.error("   node createFeature.js auth");
  process.exit(1);
}

createFeature(moduleName);
