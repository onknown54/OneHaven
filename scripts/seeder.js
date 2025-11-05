import axios from "axios";
import CONFIG from "../src/config/config.js";

let authToken = "";

eventEmitter.on("member_added", (data) => {
  console.log(`[SEED] Event received: member_added —`, data);
});

export async function createCaregiver() {
  try {
    const response = await axios.post(`${CONFIG.BASE_URL}/caregivers/signup`, {
      name: "Test Caregiver",
      email: `caregiver-${Date.now()}@test.com`,
      passkey: "password123",
    });

    authToken = response.data.token;
    console.log("Created caregiver:", response.data.caregiver.email);
    return response.data.caregiver;
  } catch (error) {
    console.error(
      "Error creating caregiver:",
      error.response?.data || error.message
    );

    throw error;
  }
}

export async function createProtectedMember(memberData) {
  try {
    const response = await axios.post(
      `${CONFIG.BASE_URL}/protected-members`,
      memberData,
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );

    return response.data.member;
  } catch (error) {
    console.error(
      "Error creating member:",
      error.response?.data || error.message
    );

    throw error;
  }
}

async function runSeed() {
  console.log("Starting seed script...\n");
  await createCaregiver();

  const membersData = [
    {
      firstName: "John",
      lastName: "Doe",
      relationship: "Son",
      birthYear: 2010,
      status: "active",
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      relationship: "Daughter",
      birthYear: 2012,
      status: "active",
    },
    {
      firstName: "Robert",
      lastName: "Johnson",
      relationship: "Parent",
      birthYear: 1955,
      status: "active",
    },
  ];

  console.log("\nCreating protected members concurrently...\n");

  const promises = membersData.map((memberData) =>
    createProtectedMember(memberData)
  );

  try {
    const results = await Promise.allSettled(promises);
    console.log("\nSeed completed!");

    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        console.log(
          `✓ Created member: ${result.value.first_name} ${result.value.last_name}`
        );
      } else {
        console.log(`✗ Failed to create member ${index + 1}:`, result.reason);
      }
    });
  } catch (error) {
    console.error("Seed failed:", error);
  }
}

if (require.main === module) {
  runSeed();
}
