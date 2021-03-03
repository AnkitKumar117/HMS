const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    // todoctor_id:{
    //     type: Number,
    //     unique: true
    // },
    address: {
      type: String,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      trim: true,
    },
    contact_detail: {
      type: Number,
      required: true,
      trim: true,
    },
    payment: {
      type: Number,
      required: true,
      trim: true,
    },
    others: {
      type: String,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Please enter valid email!!");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Password should not contain password");
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

patientSchema.methods.generateAuthToken = async function () {
  const patient = this;
  console.log(patient);
  const token = jwt.sign(
    {
      _id: patient._id.toString(),
    },
    "Hospital management system"
  );
  console.log(token);
  patient.tokens = patient.tokens.concat({ token });
  console.log(patient.tokens.length);
  await patient.save();
  return token;
};

patientSchema.statics.findByCredentials = async (email, password) => {
  const patient = await Patient.findOne({ email });
  console.log(patient);
  if (!patient) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, patient.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return patient;
};

patientSchema.pre("save", async function (next) {
  const patient = this;

  if (patient.isModified("password")) {
    patient.password = await bcrypt.hash(patient.password, 8);
  }
  console.log('just before saving')
  next();
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
