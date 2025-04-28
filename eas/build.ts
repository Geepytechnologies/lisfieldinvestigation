import { execSync } from "child_process";
import { writeFileSync } from "fs";

if (process.env.GOOGLE_SERVICES_JSON) {
  console.log("Writing google-services.json...");
  writeFileSync("google-services.json", process.env.GOOGLE_SERVICES_JSON);
}

if (process.env.GOOGLE_SERVICES_INFO_PLIST) {
  console.log("GoogleService-Info.plist...");
  writeFileSync(
    "GoogleService-Info.plist",
    process.env.GOOGLE_SERVICES_INFO_PLIST
  );
}

try {
  execSync('echo "credentials has been set up!"');
} catch (error) {
  console.error("Error executing shell command:", error);
}
