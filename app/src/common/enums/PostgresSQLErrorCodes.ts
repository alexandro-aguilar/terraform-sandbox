/**
 * PostgreSQL Error Codes.
 * @see {@link https://www.postgresql.org/docs/current/errcodes-appendix.html}
 */

enum PostgresSQLErrorCodes {
  /* CLASS 00 — SUCCESSFUL COMPLETION */
  SUCCESSFUL_COMPLETION = '00000',
  /* CLASS 01 — WARNING */
  WARNING = '01000',
  DYNAMIC_RSULT_SET_RETURND = '0100C',
  IMPLICIT_ZERO_BIT_PADDING = '01008',
  NULL_VALUE_ELIMINTED_FUCN = '01003',
  PRIVILEGE_NOT_GRANTED = '01007',
  PRIVILEGE_NOT_REVOKED = '01006',
  STRING_DATA_RIGHT_TRUNC = '01004',
  DEPRECATED_FEATURE = '01P01',

  /* CLASS 02 — NO DATA (THIS IS ALSO A WARNING CLASS PER THE SQL STANDARD) */
  NO_DATA = '02000',
  NO_ADDITIONAL_DYNMIC_RSUL = '02001', //NO_ADDITIONAL_DYNMIC_RSULT_SETS_RETURND

  /* CLASS 03 — SQL STATEMENT NOT YET COMPLETE */
  STATEMENT_NOT_YET_COMPLTE = '03000',

  /* CLASS 08 — CONNECTION EXCEPTION */
  CONNECTION_EXCEPTION = '08000',
  CONNECTION_DOES_NOT_EXIST = '08003',
  CONNECTION_FAILURE = '08006',
  SQLCLIENT_UNABLE_TO_ESTAB = '08001', // SQLCLIENT_UNABLE_TO_ESTABLISH_SQLCONNECTION
  SQLSERVER_REJECTED_ESTABL = '08004', // SQLSERVER_REJECTED_ESTABLISHMENT_OF_SQLCONNECTION
  TRANSACTION_RESOLUTION_UN = '08007',
  PROTOCOL_VIOLATION = '08P01',

  /* CLASS 09 — TRIGGERED ACTION EXCEPTION */
  TRIGGERED_ACTION_EXCEPTIO = '09000',

  /* CLASS 0A — FEATURE NOT SUPPORTED */
  FEATURE_NOT_SUPPORTED = '0A000',

  /* CLASS 0B — INVALID TRANSACTION INITIATION */
  INVALID_TRANSACTION_INITI = '0B000',

  /* CLASS 0F — LOCATOR EXCEPTION */
  LOCATOR_EXCEPTION = '0F000',
  INVALID_LOCATOR_SPECIFICA = '0F001',

  /* CLASS 0L — INVALID GRANTOR */
  INVALID_GRANTOR = '0L000',
  INVALID_GRANT_OPERATION = '0LP01',

  /* CLASS 0P — INVALID ROLE SPECIFICATION */
  INVALID_ROLE_SPECIFICATIO = '0P000',

  /* CLASS 0Z — DIAGNOSTICS EXCEPTION */
  DIAGNOSTICS_EXCEPTION = '0Z000',
  STACKED_DIAGNOSTICS_ACCES = '0Z002',

  /* CLASS 20 — CASE NOT FOUND */
  CASE_NOT_FOUND = '20000',

  /* CLASS 21 — CARDINALITY VIOLATION */
  CARDINALITY_VIOLATION = '21000',

  /* CLASS 22 — DATA EXCEPTION */
  DATA_EXCEPTION = '22000',
  ARRAY_SUBSCRIPT_ERROR = '2202E',
  CHARACTER_NOT_IN_REPERTOI = '22021',
  DATETIME_FIELD_OVERFLOW = '22008',
  DIVISION_BY_ZERO = '22012',
  ERROR_IN_ASSIGNMENT = '22005',
  ESCAPE_CHARACTER_CONFLICT = '2200B',
  INDICATOR_OVERFLOW = '22022',
  INTERVAL_FIELD_OVERFLOW = '22015',
  INVALID_ARGUMENT_FOR_LOGA = '2201E',
  INVALID_ARGUMENT_FOR_NTIL = '22014',
  INVALID_ARGUMENT_FOR_NTH_ = '22016',
  INVALID_ARGUMENT_FOR_POWE = '2201F',
  INVALID_ARGUMENT_FOR_WIDT = '2201G',
  INVALID_CHARACTER_VALUE_F = '22018',
  INVALID_DATETIME_FORMAT = '22007',
  INVALID_ESCAPE_CHARACTER = '22019',
  INVALID_ESCAPE_OCTET = '2200D',
  INVALID_ESCAPE_SEQUENCE = '22025',
  NONSTANDARD_USE_OF_ESCAPE = '22P06',
  INVALID_INDICATOR_PARAMET = '22010',
  INVALID_PARAMETER_VALUE = '22023',
  INVALID_PRECEDING_OR_FOLL = '22013',
  INVALID_REGULAR_EXPRESSIO = '2201B',
  INVALID_ROW_COUNT_IN_LIMI = '2201W',
  INVALID_ROW_COUNT_IN_RSUL = '2201X',
  INVALID_TABLESAMPLE_ARGUM = '2202H',
  INVALID_TABLESAMPLE_REPEA = '2202G',
  INVALID_TIME_ZONE_DISPLAC = '22009',
  INVALID_USE_OF_ESCAPE_CHA = '2200C',
  MOST_SPECIFIC_TYPE_MISMAT = '2200G',
  NULL_VALUE_NOT_ALLOWED = '22004',
  NULL_VALUE_NO_INDICATOR_P = '22002',
  NUMERIC_VALUE_OUT_OF_RANG = '22003',
  SEQUENCE_GENERATOR_LIMIT = '2200H',
  STRING_DATA_LENGTH_MISMA = '22026',
  STRING_DATA_RIGHT_TRUNCA = '22001',
  SUBSTRING_ERROR = '22011',
  TRIM_ERROR = '22027',
  UNTERMINATED_C_STRING = '22024',
  ZERO_LENGTH_CHARACTER_STR = '2200F',
  FLOATING_POINT_EXCEPTION = '22P01',
  INVALID_TEXT_REPRESENTATI = '22P02',
  INVALID_BINARY_REPRESENTA = '22P03',
  BAD_COPY_FILE_FORMAT = '22P04',
  UNTRANSLATABLE_CHARACTER = '22P05',
  NOT_AN_XML_DOCUMENT = '2200L',
  INVALID_XML_DOCUMENT = '2200M',
  INVALID_XML_CONTENT = '2200N',
  INVALID_XML_COMMENT = '2200S',
  INVALID_XML_PROCESSING_IN = '2200T',
  DUPLICATE_JSON_OBJECT_KEY = '22030',
  INVALID_ARGUMENT_FOR_SQL_ = '22031',
  INVALID_JSON_TEXT = '22032',
  INVALID_SQL_JSON_SUBSCRIP = '22033',
  MORE_THAN_ONE_SQL_JSON_IT = '22034',
  NO_SQL_JSON_ITEM = '22035',
  NON_NUMERIC_SQL_JSON_ITEM = '22036',
  NON_UNIQUE_KEYS_IN_A_JSON = '22037',
  SINGLETON_SQL_JSON_ITEM_R = '22038',
  SQL_JSON_ARRAY_NOT_FOUND = '22039',
  SQL_JSON_MEMBER_NOT_FOUND = '2203A',
  SQL_JSON_NUMBER_NOT_FOUND = '2203B',
  SQL_JSON_OBJECT_NOT_FOUND = '2203C',
  TOO_MANY_JSON_ARRAY_ELEME = '2203D',
  TOO_MANY_JSON_OBJECT_MEMB = '2203E',
  SQL_JSON_SCALAR_REQUIRED = '2203F',

  /* CLASS 23 — INTEGRITY CONSTRAINT VIOLATION */
  INTEGRITY_CONSTRAINT_VIOL = '23000',
  RESTRICT_VIOLATION = '23001',
  NOT_NULL_VIOLATION = '23502',
  FOREIGN_KEY_VIOLATION = '23503',
  UNIQUE_VIOLATION = '23505',
  CHECK_VIOLATION = '23514',
  EXCLUSION_VIOLATION = '23P01',

  /* CLASS 24 — INVALID CURSOR STATE */
  INVALID_CURSOR_STATE = '24000',

  /* CLASS 25 — INVALID TRANSACTION STATE */
  INVALID_TRANSACTION_STATE = '25000',
  ACTIVE_SQL_TRANSACTION = '25001',
  BRANCH_TRANSACTION_ALREAD = '25002',
  HELD_CURSOR_REQUIRES_SAME = '25008',
  INAPPROPRIATE_ACCESS_MODE = '25003',
  INAPPROPRIATE_ISOLATION_L = '25004',
  NO_ACTIVE_SQL_TRANSACTIO = '25005',
  READ_ONLY_SQL_TRANSACTION = '25006',
  SCHEMA_AND_DATA_STATEMENT = '25007',
  NO_ACTIVE_SQL_TRANSACTION = '25P01',
  IN_FAILED_SQL_TRANSACTION = '25P02',
  IDLE_IN_TRANSACTION_SESSI = '25P03',

  /* CLASS 26 — INVALID SQL STATEMENT NAME */
  INVALID_SQL_STATEMENT_NAM = '26000',

  /* CLASS 27 — TRIGGERED DATA CHANGE VIOLATION */
  TRIGGERED_DATA_CHANGE_VIO = '27000',

  /* CLASS 28 — INVALID AUTHORIZATION SPECIFICATION */
  INVALID_AUTHORIZATION_SPE = '28000',
  INVALID_PASSWORD = '28P01',

  /* CLASS 2B — DEPENDENT PRIVILEGE DESCRIPTORS STILL EXIST */
  DEPENDENT_PRIVILEGE_DESCR = '2B000',
  DEPENDENT_OBJECTS_STILL_E = '2BP01',

  /* CLASS 2D — INVALID TRANSACTION TERMINATION */
  INVALID_TRANSACTION_TERMI = '2D000',

  /* CLASS 2F — SQL ROUTINE EXCEPTION */
  SQL_ROUTINE_EXCEPTION = '2F000',
  FUNCTION_EXECUTED_NO_RETU = '2F005',
  MODIFYING_SQL_DATA_NOT_PE = '2F002',
  PROHIBITED_SQL_STATEMENT = '2F003',
  READING_SQL_DATA_NOT_PER = '2F004',

  /* CLASS 34 — INVALID CURSOR NAME */
  INVALID_CURSOR_NAME = '34000',

  /* CLASS 38 — EXTERNAL ROUTINE EXCEPTION */
  EXTERNAL_ROUTINE_EXCEPTI = '38000',
  CONTAINING_SQL_NOT_PERMI = '38001',
  MODIFYING_SQL_DATA_NOT_P = '38002',
  PROHIBITED_SQL_STATEMEN = '38003',
  READING_SQL_DATA_NOT_PE = '38004',

  /* CLASS 39 — EXTERNAL ROUTINE INVOCATION EXCEPTION */
  EXTERNAL_ROUTINE_INVOCATI = '39000',
  INVALID_SQLSTATE_RETURND = '39001',
  NULL_VALUE_NOT_ALOWED = '39004',
  TRIGGER_PROTOCOL_VIOLATED = '39P01',
  SRF_PROTOCOL_VIOLATED = '39P02',
  EVENT_TRIGGER_PROTOCOL_VI = '39P03',

  /* CLASS 3B — SAVEPOINT EXCEPTION */
  SAVEPOINT_EXCEPTION = '3B000',
  INVALID_SAVEPOINT_SPECIFI = '3B001',

  /* CLASS 3D — INVALID CATALOG NAME */
  INVALID_CATALOG_NAME = '3D000',

  /* CLASS 3F — INVALID SCHEMA NAME */
  INVALID_SCHEMA_NAME = '3F000',

  /* CLASS 40 — TRANSACTION ROLLBACK */
  TRANSACTION_ROLLBACK = '40000',
  TRANSACTION_INTEGRITY_CON = '40002',
  SERIALIZATION_FAILURE = '40001',
  STATEMENT_COMPLETION_UNKN = '40003',
  DEADLOCK_DETECTED = '40P01',

  /* CLASS 42 — SYNTAX ERROR OR ACCESS RULE VIOLATION */
  SYNTAX_ERROR_OR_ACCESS_RU = '42000',
  SYNTAX_ERROR = '42601',
  INSUFFICIENT_PRIVILEGE = '42501',
  CANNOT_COERCE = '42846',
  GROUPING_ERROR = '42803',
  WINDOWING_ERROR = '42P20',
  INVALID_RECURSION = '42P19',
  INVALID_FOREIGN_KEY = '42830',
  INVALID_NAME = '42602',
  NAME_TOO_LONG = '42622',
  RESERVED_NAME = '42939',
  DATATYPE_MISMATCH = '42804',
  INDETERMINATE_DATATYPE = '42P18',
  COLLATION_MISMATCH = '42P21',
  INDETERMINATE_COLLATION = '42P22',
  WRONG_OBJECT_TYPE = '42809',
  GENERATED_ALWAYS = '428C9',
  UNDEFINED_COLUMN = '42703',
  UNDEFINED_FUNCTION = '42883',
  UNDEFINED_TABLE = '42P01',
  UNDEFINED_PARAMETER = '42P02',
  UNDEFINED_OBJECT = '42704',
  DUPLICATE_COLUMN = '42701',
  DUPLICATE_CURSOR = '42P03',
  DUPLICATE_DATABASE = '42P04',
  DUPLICATE_FUNCTION = '42723',
  DUPLICATE_PREPARED_STATEM = '42P05',
  DUPLICATE_SCHEMA = '42P06',
  DUPLICATE_TABLE = '42P07',
  DUPLICATE_ALIAS = '42712',
  DUPLICATE_OBJECT = '42710',
  AMBIGUOUS_COLUMN = '42702',
  AMBIGUOUS_FUNCTION = '42725',
  AMBIGUOUS_PARAMETER = '42P08',
  AMBIGUOUS_ALIAS = '42P09',
  INVALID_COLUMN_REFERENCE = '42P10',
  INVALID_COLUMN_DEFINITION = '42611',
  INVALID_CURSOR_DEFINITION = '42P11',
  INVALID_DATABASE_DEFINITI = '42P12',
  INVALID_FUNCTION_DEFINITI = '42P13',
  INVALID_PREPARED_STATEMEN = '42P14',
  INVALID_SCHEMA_DEFINITION = '42P15',
  INVALID_TABLE_DEFINITION = '42P16',
  INVALID_OBJECT_DEFINITION = '42P17',

  /* CLASS 44 — WITH CHECK OPTION VIOLATION */
  WITH_CHECK_OPTION_VIOLATI = '44000',

  /* CLASS 53 — INSUFFICIENT RESOURCES */
  INSUFFICIENT_RESOURCES = '53000',
  DISK_FULL = '53100',
  OUT_OF_MEMORY = '53200',
  TOO_MANY_CONNECTIONS = '53300',
  CONFIGURATION_LIMIT_EXCEE = '53400',

  /* CLASS 54 — PROGRAM LIMIT EXCEEDED */
  PROGRAM_LIMIT_EXCEEDED = '54000',
  STATEMENT_TOO_COMPLEX = '54001',
  TOO_MANY_COLUMNS = '54011',
  TOO_MANY_ARGUMENTS = '54023',

  /* CLASS 55 — OBJECT NOT IN PREREQUISITE STATE */
  OBJECT_NOT_IN_PREREQUISIT = '55000',
  OBJECT_IN_USE = '55006',
  CANT_CHANGE_RUNTIME_PARAM = '55P02',
  LOCK_NOT_AVAILABLE = '55P03',
  UNSAFE_NEW_ENUM_VALUE_USA = '55P04',

  /* CLASS 57 — OPERATOR INTERVENTION */
  OPERATOR_INTERVENTION = '57000',
  QUERY_CANCELED = '57014',
  ADMIN_SHUTDOWN = '57P01',
  CRASH_SHUTDOWN = '57P02',
  CANNOT_CONNECT_NOW = '57P03',
  DATABASE_DROPPED = '57P04',
  IDLE_SESSION_TIMEOUT = '57P05',

  /* CLASS 58 — SYSTEM ERROR(ERRORS EXTERNAL TO POSTGRESQL ITSELF) */
  SYSTEM_ERROR = '58000',
  IO_ERROR = '58030',
  UNDEFINED_FILE = '58P01',
  DUPLICATE_FILE = '58P02',

  /* CLASS 72 — SNAPSHOT FAILURE */
  SNAPSHOT_TOO_OLD = '72000',

  /* CLASS F0 — CONFIGURATION FILE ERROR */
  CONFIG_FILE_ERROR = 'F0000',
  LOCK_FILE_EXISTS = 'F0001',

  /* CLASS HV — FOREIGN DATA WRAPPER ERROR(SQL / MED) */
  FDW_ERROR = 'HV000',
  FDW_COLUMN_NAME_NOT_FOUND = 'HV005',
  FDW_DYNAMIC_PARAMETER_VAL = 'HV002',
  FDW_FUNCTION_SEQUENCE_ERR = 'HV010',
  FDW_INCONSISTENT_DESCRIPT = 'HV021',
  FDW_INVALID_ATTRIBUTE_VAL = 'HV024',
  FDW_INVALID_COLUMN_NAME = 'HV007',
  FDW_INVALID_COLUMN_NUMBER = 'HV008',
  FDW_INVALID_DATA_TYPE = 'HV004',
  FDW_INVALID_DATA_TYPE_DES = 'HV006',
  FDW_INVALID_DESCRIPTOR_FI = 'HV091',
  FDW_INVALID_HANDLE = 'HV00B',
  FDW_INVALID_OPTION_INDEX = 'HV00C',
  FDW_INVALID_OPTION_NAME = 'HV00D',
  FDW_INVALID_STRING_LENGTH = 'HV090',
  FDW_INVALID_STRING_FORMAT = 'HV00A',
  FDW_INVALID_USE_OF_NULL_P = 'HV009',
  FDW_TOO_MANY_HANDLES = 'HV014',
  FDW_OUT_OF_MEMORY = 'HV001',
  FDW_NO_SCHEMAS = 'HV00P',
  FDW_OPTION_NAME_NOT_FOUND = 'HV00J',
  FDW_REPLY_HANDLE = 'HV00K',
  FDW_SCHEMA_NOT_FOUND = 'HV00Q',
  FDW_TABLE_NOT_FOUND = 'HV00R',
  FDW_UNABLE_TO_CREATE_EXEC = 'HV00L',
  FDW_UNABLE_TO_CREATE_REPL = 'HV00M',
  FDW_UNABLE_TO_ESTABLISH_C = 'HV00N',

  /* CLASS P0 — PL / PGSQL ERROR */
  PLPGSQL_ERROR = 'P0000',
  RAISE_EXCEPTION = 'P0001',
  NO_DATA_FOUND = 'P0002',
  TOO_MANY_ROWS = 'P0003',
  ASSERT_FAILURE = 'P0004',

  /* CLASS XX — INTERNAL ERROR */
  INTERNAL_ERROR = 'XX000',
  DATA_CORRUPTED = 'XX001',
  INDEX_CORRUPTED = 'XX002',
}

export default PostgresSQLErrorCodes;
