const express = require("express");
const cors = require("cors");

const users = require("./api/users");
const authentications = require("./api/authentications");
const UsersService = require("./services/postgres/UsersService");
const AuthenticationsService = require("./services/postgres/AuthenticationsService");
const UsersValidator = require("./api/users/validator");
const AuthenticationsValidator = require("./api/authentications/validator");
const TokenManager = require("./token/TokenManager");

const companies = require("./api/companies");
const CompaniesService = require("./services/postgres/CompaniesService");
const CompaniesValidator = require("./api/companies/validator");

const categories = require("./api/categories");
const CategoriesService = require("./services/postgres/CategoriesService");
const CategoriesValidator = require("./api/categories/validator");

const jobs = require("./api/jobs");
const JobsService = require("./services/postgres/JobsService");
const JobsValidator = require("./api/jobs/validator");

const applications = require("./api/applications");
const ApplicationsService = require("./services/postgres/ApplicationsService");
const ApplicationsValidator = require("./api/applications/validator");

const bookmarks = require("./api/bookmarks");
const BookmarksService = require("./services/postgres/BookmarksService");

const documents = require("./api/documents");
const DocumentsService = require("./services/postgres/DocumentsService");

const profile = require("./api/profile");
const ProfileService = require("./services/postgres/ProfileService");

const authMiddleware = require("./middleware/auth");

const errorHandler = require("./middleware/errorHandler");
const app = express();

app.use(cors());

app.use(express.json());

const usersService = new UsersService();
const authenticationsService = new AuthenticationsService();
const companiesService = new CompaniesService();
const categoriesService = new CategoriesService();
const jobsService = new JobsService();
const applicationsService = new ApplicationsService();
const bookmarksService = new BookmarksService();
const documentsService = new DocumentsService();
const profileService = new ProfileService();

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "OpenJob API Running",
  });
});

app.use(users(usersService, UsersValidator));

app.use(
  authentications(
    authenticationsService,
    usersService,
    TokenManager,
    AuthenticationsValidator,
  ),
);

app.use(companies(companiesService, CompaniesValidator));
app.use(categories(categoriesService, CategoriesValidator));
app.use(jobs(jobsService, JobsValidator, authMiddleware));
app.use(applications(applicationsService, ApplicationsValidator));
app.use(bookmarks(bookmarksService));
app.use(documents(documentsService));
app.use(profile(profileService));

app.use(errorHandler);

module.exports = app;
