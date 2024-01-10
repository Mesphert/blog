import fs from 'fs';
// Using json file as a Database.

// [
//   { name: 'name one', age: 1 },
//   { name: 'name two', age: 2 },
//   { name: 'name three', age: 3 },
//   // ... other objects
// ];

const response = await fetch('/students.json');
const jsonDb = await response.json();	// Converting the JSON string in to JS Object

// Updated SELECT function
function SELECT(field, where) {
  const resultObject = jsonDb.find(item => item[field] === where);

  // If an object is found, extract the specified field value; otherwise, set a default value
  const fieldValue = resultObject ? resultObject[field] : 'Not Found';

  return fieldValue;
}

// Updated DELETE function
function DELETE(field, value) {
  const indexToRemove = jsonDb.findIndex(item => item[field] === value);

  if (indexToRemove !== -1) {
    jsonDb.splice(indexToRemove, 1);
    newTable = JSON.stringify(jsonDb);
	fs.writeFile('/students.json', newTable);
    return true; // Indicate successful deletion
  }

  return false; // Indicate no matching record found
}

// INSERT function
function INSERT(data) {
  // Assume 'data' is an object like { name: 'new name', age: 4 }
	jsonDb.push(data);
	newTable = JSON.stringify(jsonDb);
	fs.writeFile('/students.json', newTable);  
  return true; // Indicate successful insertion
}


// A single json file is LIKE a TABLE
// The Parent Dierctory is LIKE the DATABASE Name
// There will be file named as the tables name which will have data about the table LIKE
// 		- fields names
// 		- fields data type
// 		- indexing
//		- number of entries
// 		- and other infos

// LIST OF POSSIBLE INFO ABOUT DATABASE TABLE

// Table Name: The name of the table.

// Columns/Fields: A list of all columns or fields within the table.

// Data Types: The data types associated with each column (e.g., VARCHAR, INTEGER, DATE).

// Primary Key: The column or combination of columns that uniquely identifies each record in the table.

// Foreign Keys: Columns that establish relationships with other tables.

// Indexes: Columns indexed for faster search and retrieval.

// Constraints: Any constraints on the data, such as NOT NULL, UNIQUE, CHECK, etc.

// Table Size: The number of rows and overall size of the table in terms of storage.

// Creation Date: When the table was created.

// Modification Date: When the table was last modified.

// Description/Comments: A textual description or comments related to the purpose or usage of the table.

// Triggers: Any triggers associated with the table.

// Dependencies: Tables or views that depend on the current table.

// Data Distribution: Information on how data is distributed across the table, especially relevant in distributed databases.

// Sample Data: A few sample rows of data to understand the kind of information stored in the table.

// Source of Data: If the table is part of a data integration or ETL process, information about the source of the data.

// Data Ownership: Information about who owns or manages the data in the table.

// Data Lifecycle: Details about how data is managed throughout its lifecycle in the table.

// Usage Statistics: Information on how frequently the table is queried or updated.

// Security Permissions: Details about who has access to the table and what kind of access they have (read, write, delete).

// Backups and Recovery: Information on how the data in the table is backed up and how recovery is handled.

// Partitioning: If the table is partitioned, details about the partitioning strategy.

// Normalization Level: Information about the normalization level of the table (e.g., 1NF, 2NF, 3NF).

// Denormalization: If applicable, details about any denormalization performed on the table for optimization.

// Archiving Strategy: How historical or archived data is managed within the table.

// Replication: If the table is part of a replicated setup, details about replication strategy.

// Performance Metrics: Information on the performance of queries involving the table.

// Documentation Links: Links to any documentation related to the table.