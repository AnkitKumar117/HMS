const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    employee_id: {
      type: String,
      trim: true,
      required: true,
    },
    address: {
      type: String,
      trim: true,
      required: true,
    },
    contact_detail: {
      type: String,
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

employeeSchema.methods.generateAuthToken = async function () {
  const employee = this;
  const token = jwt.sign(
    {
      _id: employee._id.toString(),
    },
    "Hospital management system"
  );
  employee.tokens = employee.tokens.concat({ token });
  await employee.save();
  return token;
};

employeeSchema.statics.findByCredentials = async (email, password) => {
  const employee = await Employee.findOne({ email });
  console.log(employee)
  if (!employee) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, employee.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return employee;
};
employeeSchema.pre("save", async function (next) {
    const employee = this;
  
    if (employee.isModified("password")) {
        employee.password = await bcrypt.hash(employee.password, 8);
    }
  
    next();
  });

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
