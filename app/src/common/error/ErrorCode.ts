import ErrorCategory from '../enums/ErrorCategory';
import { ErrorType } from './BaseError';

const ErrorCode: { [key: string]: ErrorType } = {
  //#region ERR0000 ... ERR0099 = Generales aplicativo
  ERR0000: {
    code: 'ERR0000',
    category: ErrorCategory.SYSTEM,
    msg: 'INTERNAL_SERVER_ERROR',
    description: '',
  },
  ERR0001: {
    code: 'ERR0001',
    category: ErrorCategory.USER,
    msg: 'NOT_FOUND',
    description: '',
  },
  ERR0002: {
    code: 'ERR0002',
    category: ErrorCategory.USER,
    msg: 'CANNOT_UPDATE_DUE_TO_OUTDATED_DATA',
    description: '',
  },
  ERR0003: {
    code: 'ERR0003',
    category: ErrorCategory.USER,
    msg: 'INVALID_PAGINATION_FORMAT',
    description: '',
  },
  ERR0004: {
    code: 'ERR0004',
    category: ErrorCategory.USER,
    msg: 'INVALID_PAGINATION_LIMIT',
    description: '',
  },
  ERR0005: {
    code: 'ERR0005',
    category: ErrorCategory.USER,
    msg: 'INVALID_PARAMETERS',
    description: 'Ensure that at least one parameter is brought',
  },
  ERR0006: {
    code: 'ERR0006',
    category: ErrorCategory.USER,
    msg: 'MISSING_PARAMETERS',
    description: '',
  },
  ERR0007: {
    code: 'ERR0007',
    category: ErrorCategory.USER,
    msg: 'DUPLICATED_KEY',
    description: '',
  },
  ERR0008: {
    code: 'ERR0008',
    category: ErrorCategory.USER,
    msg: 'BAD_REQUEST',
    description: '',
  },
  ERR0009: {
    code: 'ERR0009',
    category: ErrorCategory.USER,
    msg: 'METHOD_DEPRECATED',
    description: '',
  },
  ERR0010: {
    code: 'ERR0010',
    category: ErrorCategory.SYSTEM,
    msg: 'DATABASE_UNAVAILABLE',
    description: '',
  },
  ERR0011: {
    code: 'ERR0011',
    category: ErrorCategory.SYSTEM,
    msg: 'SERVICE_UNAVAILABLE',
    description: '',
  },
  ERR0012: {
    code: 'ERR0012',
    category: ErrorCategory.SYSTEM,
    msg: 'COLUMN_NOT_FOUND',
    description: '',
  },
  ERR0013: {
    code: 'ERR0013',
    category: ErrorCategory.SYSTEM,
    msg: 'DUPLICATED_ID_FOUND',
    description: '',
  },
  ERR0014: {
    code: 'ERR0014',
    category: ErrorCategory.SYSTEM,
    msg: 'ITEM_INACTIVE',
    description: '',
  },
  ERR0015: {
    code: 'ERR0015',
    category: ErrorCategory.BUSINESS,
    msg: 'RULE_NOT_APPLY',
    description: '',
  },
  ERR0016: {
    code: 'ERR0016',
    category: ErrorCategory.SYSTEM,
    msg: 'CANNOT_CONNECT_TO_DATABASE',
    description: '',
  },
  ERR0017: {
    code: 'ERR0017',
    category: ErrorCategory.SYSTEM,
    msg: 'API_VERSION_NOT_SUPPORTED',
    description: '',
  },
  ERR1001: {
    code: 'ERR1001',
    category: ErrorCategory.BUSINESS,
    msg: 'Couple participants must be adults',
    description: '',
  },
  //#endregion General

  //#region ERR0100 ... ERR0499 = Booking
  //#endregion Booking

  //#region ERR0500 ... ERR0799 = Links
  //#endregion Links

  //#region ERR0800 ... ERR1299 = Groups
  //#endregion Groups

  //#region ERR1200 ... ERR1999 = Admin
  ERR1200: {
    code: 'ERR1200',
    category: ErrorCategory.USER,
    msg: 'BOOKING_MODULE',
    description: 'Incorrect value for description, please provide a valid description.',
  },
  ERR1201: {
    code: 'ERR1201',
    category: ErrorCategory.USER,
    msg: 'BOOKING_MODULE',
    description: 'Incorrect value for created-by, please provide a valid value.',
  },
  ERR1202: {
    code: 'ERR1202',
    category: ErrorCategory.USER,
    msg: 'BOOKING_MODULE',
    description: 'Incorrect value for updated-by, please provide a valid value.',
  },
  ERR1203: {
    code: 'ERR1203',
    category: ErrorCategory.USER,
    msg: 'BOOKING_MODULE',
    description: 'Incorrect value for grouper Id, please provide a valid Id.',
  },
  ERR1204: {
    code: 'ERR1204',
    category: ErrorCategory.USER,
    msg: 'BOOKING_MODULE',
    description: 'Incorrect value for clause Id, please provide a valid Id.',
  },
  ERR1205: {
    code: 'ERR1205',
    category: ErrorCategory.USER,
    msg: 'BOOKING_MODULE',
    description: 'Incorrect value for parent-configuration Id, please provide a unique Id.',
  },
  ERR1206: {
    code: 'ERR1206',
    category: ErrorCategory.USER,
    msg: 'BOOKING_MODULE',
    description: 'Incorrect value for order, please provide a valid order number.',
  },
  ERR1207: {
    code: 'ERR1207',
    category: ErrorCategory.USER,
    msg: 'BOOKING_MODULE',
    description: 'Incorrect value for Clause content, please provide Clause content.',
  },
  ERR1208: {
    code: 'ERR1208',
    category: ErrorCategory.USER,
    msg: 'BOOKING_MODULE',
    description: 'Incorrect value for process-sales Id, please provide a valid Id.',
  },
  ERR1209: {
    code: 'ERR1209',
    category: ErrorCategory.USER,
    msg: 'BOOKING_MODULE',
    description: 'Incorrect value for market-group Id, please provide a valid Id.',
  },
  ERR1210: {
    code: 'ERR1210',
    category: ErrorCategory.USER,
    msg: 'BOOKING_MODULE',
    description: 'Incorrect value for market-code Id, please provide a valid Id.',
  },
  ERR1211: {
    code: 'ERR1211',
    category: ErrorCategory.USER,
    msg: 'BOOKING_MODULE',
    description: 'Incorrect value for parent-configuration Id, please provide a unique Id.',
  },
  ERR1212: {
    code: 'ERR1212',
    category: ErrorCategory.USER,
    msg: 'BOOKING_MODULE',
    description: 'Incorrect value for parameters, please provide a valid value for parameters.',
  },
  ERR1213: {
    code: 'ERR1213',
    category: ErrorCategory.USER,
    msg: 'BOOKING_MODULE',
    description: 'Incorrect value for initial-value, please provide a valid number.',
  },
  ERR1214: {
    code: 'ERR1214',
    category: ErrorCategory.USER,
    msg: 'BOOKING_MODULE',
    description: 'Incorrect value for end-value, please provide a valid number.',
  },
  ERR1215: {
    code: 'ERR1215',
    category: ErrorCategory.USER,
    msg: 'BOOKING_MODULE',
    description: 'Incorrect value for start date, please provide a valid date.',
  },
  ERR1216: {
    code: 'ERR1216',
    category: ErrorCategory.USER,
    msg: 'BOOKING_MODULE',
    description: 'Incorrect value for end date, please provide a valid date.',
  },
  ERR1217: {
    code: 'ERR1217',
    category: ErrorCategory.USER,
    msg: 'BOOKING_MODULE',
    description: 'Incorrect value for date-type, please provide a valid date-type.',
  },
  ERR1218: {
    code: 'ERR1218',
    category: ErrorCategory.USER,
    msg: 'BOOKING_MODULE',
    description: 'Incorrect value for layer Id, please provide a unique Id.',
  },
  ERR1219: {
    code: 'ERR1219',
    category: ErrorCategory.USER,
    msg: 'BOOKING_MODULE',
    description: 'Incorrect value for variable Id, please provide a unique Id.',
  },
  ERR1220: {
    code: 'ERR1220',
    category: ErrorCategory.USER,
    msg: 'BOOKING_MODULE',
    description: 'Incorrect value for initial-value layer, please provide a valid value.',
  },
  ERR1221: {
    code: 'ERR1221',
    category: ErrorCategory.USER,
    msg: 'BOOKING_MODULE',
    description: 'Incorrect value for end-value layer, please provide a valid value.',
  },
  ERR1222: {
    code: 'ERR1222',
    category: ErrorCategory.USER,
    msg: 'BOOKING_MODULE',
    description: 'Incorrect value for authorizer, please provide a valid value.',
  },
  ERR1223: {
    code: 'ERR1223',
    category: ErrorCategory.USER,
    msg: 'BOOKING_MODULE',
    description: 'Incorrect value for level, please provide a valid number.',
  },
  ERR1224: {
    code: 'ERR1224',
    category: ErrorCategory.USER,
    msg: 'BOOKING_MODULE',
    description: 'Incorrect value for subject, please provide a valid subject.',
  },
  ERR1225: {
    code: 'ERR1225',
    category: ErrorCategory.USER,
    msg: 'BOOKING_MODULE',
    description: 'Incorrect value for message, please provide a valid message.',
  },
  ERR1226: {
    code: 'ERR1226',
    category: ErrorCategory.USER,
    msg: 'BOOKING_MODULE',
    description: 'Incorrect value for notification-group, please provide a valid notification-group.',
  },
  ERR1227: {
    code: 'ERR1227',
    category: ErrorCategory.USER,
    msg: 'BOOKING_MODULE',
    description: 'Incorrect value for emails, please provide a valid emails.',
  },
  ERR1228: {
    code: 'ERR1228',
    category: ErrorCategory.USER,
    msg: 'BOOKING_MODULE',
    description: 'Incorrect value for type Id, please provide a valid number.',
  },
  ERR1229: {
    code: 'ERR1229',
    category: ErrorCategory.USER,
    msg: 'BOOKING_MODULE',
    description: 'Incorrect value for geographic-territory Id, please provide a valid Id.',
  },
  ERR1230: {
    code: 'ERR1230',
    category: ErrorCategory.USER,
    msg: 'BOOKING_MODULE',
    description: 'Incorrect value for geographic-location Id, please provide a valid Id.',
  },
  ERR1231: {
    code: 'ERR1231',
    category: ErrorCategory.USER,
    msg: 'BOOKING_MODULE',
    description: 'Incorrect value for concept Id, please provide a unique Id.',
  },
  ERR1300: {
    code: 'ERR1300',
    category: ErrorCategory.USER,
    msg: 'COMMON_ERRORS',
    description: 'hotelCode must be a string',
  },
  ERR1301: {
    code: 'ERR1301',
    category: ErrorCategory.USER,
    msg: 'COMMON_ERRORS',
    description: 'Maximum characters for hotelCode reached',
  },
  ERR1302: {
    code: 'ERR1302',
    category: ErrorCategory.USER,
    msg: 'COMMON_ERRORS',
    description: 'hotelCode is not allowed to be empty',
  },
  ERR1303: {
    code: 'ERR1303',
    category: ErrorCategory.USER,
    msg: 'COMMON_ERRORS',
    description: 'trackingNumber must be a string',
  },
  ERR1304: {
    code: 'ERR1304',
    category: ErrorCategory.USER,
    msg: 'COMMON_ERRORS',
    description: 'Maximum characters for trackingNumber reached',
  },
  ERR1305: {
    code: 'ERR1305',
    category: ErrorCategory.USER,
    msg: 'COMMON_ERRORS',
    description: 'trackingNumber is not allowed to be empty',
  },
  ERR1306: {
    code: 'ERR1306',
    category: ErrorCategory.USER,
    msg: 'COMMON_ERRORS',
    description: 'content must be a string',
  },
  ERR1307: {
    code: 'ERR1307',
    category: ErrorCategory.USER,
    msg: 'COMMON_ERRORS',
    description: 'content is not allowed to be empty',
  },
  //#endregion Admin

  // # templateRegion

  ERR1400: {
    code: 'ERR1400',
    category: ErrorCategory.USER,
    msg: 'COMMON_ERRORS',
    description: 'Only HMTL or MJML string is accepted',
  },
  ERR1401: {
    code: 'ERR1401',
    category: ErrorCategory.USER,
    msg: 'COMMON_ERRORS',
    description: 'Error from MJML to HTML',
  },
  // #endTemplateRegion
};
 
export default ErrorCode;
