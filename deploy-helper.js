#!/usr/bin/env node

/**
 * Deployment Helper - DNS Management System
 * This script helps with deployment setup
 */

const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

async function main() {
  console.log("\n🚀 DNS Management System - Deployment Helper");
  console.log("=".repeat(50));
  console.log("\nThis script will help you prepare for deployment.\n");

  // 1. Check git
  console.log("1️⃣  Checking Git...");
  try {
    exec("git --version", (error, stdout) => {
      if (error) {
        console.log(
          "❌ Git not found. Please install Git: https://git-scm.com"
        );
      } else {
        console.log("✅ Git is installed");
      }
    });
  } catch (e) {
    console.log("❌ Git check failed");
  }

  // 2. Check Node
  console.log("2️⃣  Checking Node.js...");
  const nodeVersion = process.version;
  console.log(`✅ Node.js ${nodeVersion} is installed`);

  // 3. Check directories
  console.log("\n3️⃣  Checking directories...");
  const backendExists = fs.existsSync("back-end");
  const frontendExists = fs.existsSync("front-end");
  console.log(backendExists ? "✅ back-end folder found" : "❌ back-end not found");
  console.log(frontendExists ? "✅ front-end folder found" : "❌ front-end not found");

  // 4. Suggest next steps
  console.log("\n" + "=".repeat(50));
  console.log("📝 Next Steps:");
  console.log("=".repeat(50));
  console.log("\n1. Create GitHub Repository:");
  console.log("   • Go to https://github.com/new");
  console.log("   • Create repo: dns-management-system");
  console.log("   • Copy repository URL");

  console.log("\n2. Push to GitHub:");
  console.log("   • Windows: Run push-to-github.bat");
  console.log("   • Mac/Linux: Run push-to-github.sh");

  console.log("\n3. Deploy Frontend on Vercel:");
  console.log("   • Go to https://vercel.com");
  console.log("   • Click 'New Project'");
  console.log("   • Import from GitHub");
  console.log("   • Root Directory: front-end");

  console.log("\n4. Deploy Backend on Vercel:");
  console.log("   • Create MongoDB database: https://mongodb.com");
  console.log("   • Deploy back-end from Vercel");
  console.log("   • Add environment variables");

  console.log("\n5. Connect Frontend to Backend:");
  console.log("   • Update REACT_APP_API_URL");
  console.log("   • Redeploy frontend");

  console.log("\n📚 Documentation:");
  console.log("   • QUICK_DEPLOY.md - Quick reference");
  console.log("   • DEPLOYMENT_GUIDE.md - Detailed guide");
  console.log("   • README.md - Project overview");

  console.log("\n✨ Happy Deploying! 🚀\n");

  rl.close();
}

main();
