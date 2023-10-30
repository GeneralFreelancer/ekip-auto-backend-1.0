"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
// import rateLimit from 'express-rate-limit'
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const passport_1 = __importDefault(require("passport"));
const passport_anonymous_1 = require("passport-anonymous");
const api_1 = __importDefault(require("./api"));
const passport_2 = __importDefault(require("./utils/passport"));
const config_1 = __importDefault(require("./config"));
const helpers_1 = require("./helpers");
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
//Rate Limiter
// app.set('trust proxy', 2)
// app.get('/ip', (request, response) => response.send(request.ip))
// const apiLimiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 500, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
// })
// app.use('/', apiLimiter)
// app.use(express.json({ limit: '1mb' }))
// app.use(express.urlencoded({ limit: '1mb', extended: true }))
app.use((0, morgan_1.default)(function (tokens, req, res) {
    return [tokens.method(req, res), tokens.url(req, res), tokens.status(req, res), '-', tokens['response-time'](req, res), 'ms'].join(' ');
}));
app.use((0, helmet_1.default)());
// const origin =
//     process.env.ENV === 'DEV'
//         ? [
//               'http://localhost:3000',
//               'http://localhost:3500',
//               'http://localhost:8080',
//               'http://localhost:4242',
//               'http://localhost:5050',
//               'http://localhost:8090',
//               /app\.dev\.lever\.com\.au$/,
//               /.*/,
//           ]
//         : ['http://localhost:3000', /app\.lever\.com\.au$/, /.*/]
// if (process.env.ENV === 'STAGE') origin.push('/app.stage.lever.com.au$/')
// app.use(
//     cors({
//         origin: origin,
//     }),
// )
app.use((0, cors_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(body_parser_1.default.json({ limit: '50mb' }));
// app.use(express.urlencoded({ extended: true }));
// app.use((req: Request, res: Response, next: NextFunction): void => {
//     if (req.originalUrl === '/stripe/stripe-wh') {
//         next()
//     } else if (req.originalUrl === '/stripe/stripe-wh-one-time-payment') {
//         next()
//     } else {
//         bodyParser.json()(req, res, next)
//     }
// })
// Connect to Mongo DB
mongoose_1.default.set('strictQuery', false);
mongoose_1.default
    .connect(config_1.default.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'ekip_auto_DB',
})
    .then(() => {
    // eslint-disable-next-line no-console
    console.log('MongoDB Connected...');
})
    // eslint-disable-next-line no-console
    .catch(err => console.log('Mongoose error: ', err));
//Authorization
passport_1.default.use(passport_2.default);
passport_1.default.use(new passport_anonymous_1.Strategy());
// Routes
app.use(api_1.default);
app.use('/images', express_1.default.static(path_1.default.join(__dirname, 'images')));
app.use('/excel', express_1.default.static(path_1.default.join(__dirname, 'excel')));
app.set('view engine', 'ejs');
// Unmatched routes
app.all('*', (req, res) => helpers_1.SendError.NOT_FOUND(res, 'Ohh you are lost, read the API documentation to find your way back home :)'));
const errorHandler = (err, req, res, _next) => {
    const { status = 500, message = 'Sever error' } = err;
    res.status(status).json({ code: status, success: false, message });
};
app.use(errorHandler);
const port = config_1.default.PORT;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Test CI/CD. Server runs on the port ${port}. Env : ${process.env.ENV}`));
//# sourceMappingURL=app.js.map