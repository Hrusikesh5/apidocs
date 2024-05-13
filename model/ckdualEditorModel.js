const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const FieldSchema = new Schema(
//   {
//     order: { type: Number, required: true },
//     type: { type: String, enum: ["title", "code", "description", "image"] },
//     content: { type: String, default: null },
//   },
//   { _id: false, strict: false }
// );

// const SubsectionSchema = new Schema(
//   {
//     name: { type: String, required: true },
//     fields: [FieldSchema],
//   },
//   { _id: false, strict: false }
// );

// const SectionSchema = new Schema(
//   {
//     name: { type: String, required: true },
//     subsections: [SubsectionSchema],
//   },
//   { strict: false }
// );

// const DocumentSchema = new Schema(
//   {
//     name: { type: String, required: true },
//     sections: [SectionSchema],
//   },
//   { strict: false }
// );

// const DocumentModel = mongoose.model("Document", DocumentSchema);

// module.exports = DocumentModel;

// {
//   "section":"Authentication"
//   "subsection":{
//       "login1":{
//         "fields":{
//           1:{
//             "code": "const a=20"
//           }
//           2: {
//             "title":"this is title"
//           },
//           3:{
//             "Description":"this is Description"
//           },
//           4:{
//             "image":"link"
//           },
//           5:{
//             "code": "let p =20"
//           },
//           6:{
//             "Description":"this is Description"
//           },
//           4:{
//             "image":"link"
//           },
//         },
//         "login2":{
//           "fields":{
//           1: {
//             "title":"this is title"
//           },
//           2:{
//             "Description":"this is Description"
//           },
//           3:{
//             "image":"link"
//           },
//           4:{
//             "code": "let pop=78"
//           }

//           },
//         },
//       },
//       "signup1":{
//         "fields":{
//           1: {
//             "title":"this is title"
//           },
//           2:{
//             "Description":"this is Description"
//           },
//           3:{
//             "image":"link"
//           },
//           4:{
//             "code": "let pop=78"
//           }
//           5: {
//             "title":"this is title"
//           },
//           6:{
//             "image":"link"
//           },

//           },
//         "signup2":{
//           "fields":{
//             1: {
//               "title":"this is title"
//             },
//             2:{
//               "code": "let pop=78"
//             }
//             3:{
//               "Description":"this is Description"
//             },
//             4:{
//               "image":"link"
//             },
//             5:{
//               "code": "let pop=78"
//             }

//             },
//         }
//       }

//   }
// }

const ApiDocsSchema = new Schema(
  {
    sections: { type: Object, required: true, index: true },
    subsections: { type: Object },
    fields: { type: Object },
    createdAt: { type: String, default: () => new Date().toISOString() },
    isVisible: { type: Boolean, default: true },
    type: { type: String, default: "1", required: true },
  },
  { timestamps: true }
);

ApiDocsSchema.index({ "subsections.sourcelat": 1, "field.1.code": 1 });
const ApiDocs = mongoose.model("ApiDocs", ApiDocsSchema);
module.exports = ApiDocs;

// {
//   "_id": {
//     "$oid": "663cca1520dc30f0fb24dfe9"
//   },
//   "section": "booking",
//   "subsection": {
//     "sourcelat": {
//       "fields": {
//         "1": {
//           "code": "<p>this is html code</p>"
//         },
//         "2": {
//           "description": "<p>jhgfh <ul><li>list1</li></ul></p>"
//         },
//         "3": {
//           "image": "https://unsplash.com/photos/a-row-of-bar-stools-sitting-next-to-a-window-8yFn-pUDAMU"
//         },
//         "4": {
//           "description": "<p>jhgfh <ul><li>list1</li></ul></p>"
//         }
//       }
//     }
//   },
//   "fields": {
//     "1": {
//       "code": "<p>this is html code</p>"
//     },
//     "2": {
//       "description": "<p>jhgfh <ul><li>list1</li></ul></p>"
//     },
//     "3": {
//       "image": "https://unsplash.com/photos/a-row-of-bar-stools-sitting-next-to-a-window-8yFn-pUDAMU"
//     },
//     "4": {
//       "description": "<p>jhgfh <ul><li>list1</li></ul></p>"
//     }
//   },
//   "createAt": {
//     "$date": "2024-05-09T13:04:38.974Z"
//   },
//   "__v": 0
// }
