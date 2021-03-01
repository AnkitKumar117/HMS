const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    employee_id: {
      type: Number,
      trim: true,
      required: true,
    },
    address: {
      type: String,
      trim: true,
      required: true,
    },
    contact_detail: {
      type: Number,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Please enter valid email");
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
    specialization: {
      type: String,
      required: true,
      trim: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    Degree: [
      {
        name: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

doctorSchema.methods.generateAuthToken = async function () {
  const doctor = this;
  const token = jwt.sign(
    {
      _id: doctor._id.toString(),
    },
    "Hospital management system"
  );
  doctor.tokens = doctor.tokens.concat({ token });
  await doctor.save();
  return token;
};

doctorSchema.statics.findByCredentials = async (email, password) => {
  const doctor = await doctor.findOne({ email });

  if (!doctor) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, doctor.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return doctor;
};
doctorSchema.pre("save", async function (next) {
    const doctor = this;
  
    if (!doctor.isModified("password")) {
      doctor.password = await bcrypt.hash(doctor.password, 8);
    }
  
    next();
  });

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
