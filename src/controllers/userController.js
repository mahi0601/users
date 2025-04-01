
const db = require("../firebase");
const { getGeoData } = require("../services/geoService");

exports.createUser = async (req, res) => {
  try {
    const { name, zip } = req.body;
    const geoData = await getGeoData(zip);
    const newUserRef = db.ref("users").push();
    const user = { id: newUserRef.key, name, zip, ...geoData };
    await newUserRef.set(user);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const snapshot = await db.ref("users").once("value");
    const users = snapshot.val() || {};
    res.json(Object.values(users));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const snapshot = await db.ref(`users/${req.params.id}`).once("value");
    const user = snapshot.val();
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const ref = db.ref(`users/${req.params.id}`);
    const snapshot = await ref.once("value");
    const existingUser = snapshot.val();
    if (!existingUser) return res.status(404).json({ error: "User not found" });

    const { name, zip } = req.body;
    let geoData = {};

    if (zip && zip !== existingUser.zip) {
      geoData = await getGeoData(zip);
    }

    const updatedUser = {
      ...existingUser,
      name: name || existingUser.name,
      zip: zip || existingUser.zip,
      ...geoData
    };

    await ref.set(updatedUser);
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await db.ref(`users/${req.params.id}`).remove();
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

