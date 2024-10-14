enum ErrorCategory {
  /**
   * This category indicates unknown errors it is not recommended to use this category.
   */
  UNKNOWN = 0,

  /**
   * This category is used for general system errors.
   */
  SYSTEM = 1,

  /**
   * This category is used for general application errors.
   * It is recommended to use this category for application errors.
   */
  APPLICATION = 2,

  /**
   * This category is used for general business errors.
   * It is recommended to use this category for errors that are not caused by a user action.
   */
  BUSINESS = 3,

  /**
   * This category is used for general user errors.
   * It is recommended to use this category for errors that are caused by a user action.
   */
  USER = 4,
}

export default ErrorCategory;
