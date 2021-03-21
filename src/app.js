const db = require("../db/models");
const { Company } = require("../db/models");
const { Department } = require("../db/models");
const { Employee } = require("../db/models");

const bodyParser = require("body-parser"); //bodyparser

const express = require("express");
const cors = require("cors");
const slugify = require("slugify");
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use(bodyParser.json()); //bodypaerser

//routes
//get
app.get("/company", async (req, res) => {
  try {
    const company = await Company.findAll();
    res.json(company);
  } catch (error) {
    console.error();
    res.status(500).json({ message: error.message });
  }
});

app.get("/department", async (req, res) => {
  try {
    const department = await Department.findAll();
    res.json(department);
  } catch (error) {
    console.error();
    res.status(500).json({ message: error.message });
  }
});

app.get("/department/:departmeId", async (req, res) => {
  const { departmentId } = req.params;
  try {
    const department = await Department.findAll({
      where: {
        CompanyId: departmentId,
      },
    });
    res.json(department);
  } catch (error) {
    console.error();
    res.status(500).json({ message: error.message });
  }
});

app.get("/employee", async (req, res) => {
  try {
    const employee = await Employee.findAll();
    res.json(employee);
  } catch (error) {
    console.error();
    res.status(500).json({ message: error.message });
  }
});

app.get("/employee/:employeeId", async (req, res) => {
  const { employeeId } = req.params;
  try {
    const employee = await Employee.findAll({
      where: {
        DepartmentId: employeeId,
      },
    });
    res.json(employee);
  } catch (error) {
    console.error();
    res.status(500).json({ message: error.message });
  }
});

//delete
app.delete("/department/:departmentId", async (req, res) => {
  const { departmentId } = req.params;
  try {
    const foundDepartment = await Department.findByPk(departmentId);
    if (foundDepartment) {
      await foundDepartment.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Department not found" });
    }
  } catch {
    console.error();
    res.status(500).json({ message: error.message });
  }
});

app.delete("/employee/:employeeId", async (req, res) => {
  const { employeeId } = req.params;
  try {
    const foundEmployee = await Employee.findByPk(employeeId);
    if (foundEmployee) {
      await foundEmployee.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch {
    console.error();
    res.status(500).json({ message: error.message });
  }
});

// add
app.post("/company", async (req, res) => {
  try {
    const _slug = slugify(req.body.name, { lower: true });
    const newCompany = {
      ...req.body,
      slug: _slug,
    };
    await Company.create(newCompany);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/department", async (req, res) => {
  try {
    const _slug = slugify(req.body.name, { lower: true });
    const newDepartment = {
      ...req.body,
      slug: _slug,
    };
    await Department.create(newDepartment);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/employee", async (req, res) => {
  try {
    const _slug = slugify(req.body.name, { lower: true });
    const newEmployee = {
      ...req.body,
      slug: _slug,
    };
    await Employee.create(newEmployee);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update

app.patch("/company/:companyId", async (req, res) => {
  const { companyId } = req.params;
  try {
    const foundCompany = await Company.findByPk(companyId);
    if (foundCompany) {
      const _slug = slugify(req.body.name, { lower: true });
      const newCompany = {
        ...req.body,
        slug: _slug,
      };
      await foundCompany.update(newCompany);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Company not found" });
    }
  } catch {
    console.error();
    res.status(500).json({ message: error.message });
  }
});

app.patch("/department/:departmentId", async (req, res) => {
  const { departmentId } = req.params;
  try {
    const foundDepartment = await Department.findByPk(departmentId);
    if (foundDepartment) {
      const _slug = slugify(req.body.name, { lower: true });
      const newDepartment = {
        ...req.body,
        slug: _slug,
      };
      await foundDepartment.update(newDepartment);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Department not found" });
    }
  } catch {
    console.error();
    res.status(500).json({ message: error.message });
  }
});

app.patch("/employee/:employeeId", async (req, res) => {
  const { employeeId } = req.params;
  try {
    const foundEmployee = await Employee.findByPk(employeeId);
    if (foundEmployee) {
      const _slug = slugify(req.body.name, { lower: true });
      const newEmployee = {
        ...req.body,
        slug: _slug,
      };
      await foundEmployee.update(newEmployee);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch {
    console.error();
    res.status(500).json({ message: error.message });
  }
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});

const run = async () => {
  try {
    await db.sequelize.sync();
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }

  await app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });
};
run();
