// types.js

/**
 * @typedef {'low' | 'medium' | 'high' | 'critical'} SeverityLevel
 */

/**
 * @typedef {'pending' | 'in-progress' | 'resolved'} IssueStatus
 */

/**
 * @typedef {'push' | 'sms' | 'email'} NotificationType
 */

/**
 * @typedef {'sent' | 'delivered' | 'failed'} NotificationStatus
 */

/**
 * @typedef {Object} NotificationLog
 * @property {string} id
 * @property {NotificationType} type
 * @property {string} recipient
 * @property {string} message
 * @property {Date} timestamp
 * @property {NotificationStatus} status
 * @property {string} issueId
 */

/**
 * @typedef {Object} Issue
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} location
 * @property {SeverityLevel} severity
 * @property {Date} timestamp
 * @property {IssueStatus} status
 * @property {string} [assignedTo]
 * @property {string} reportedBy
 * @property {string} category
 * @property {NotificationLog[]} notificationsSent
 */

/**
 * @typedef {Object} StaffMember
 * @property {string} id
 * @property {string} name
 * @property {string} role
 * @property {string} phone
 * @property {string} email
 * @property {boolean} isAvailable
 */

