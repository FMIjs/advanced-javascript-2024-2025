const fs = require('fs');
const studentsFileName = 'students.txt';
const scoresFileName = 'scores.txt';
const coursesFileName = 'courses.txt';

function readStudents(cb) {
  return fs.readFile(studentsFileName, { encoding: 'utf-8' }, cb);
}

function readScores(cb) {
  return fs.readFile(scoresFileName, { encoding: 'utf-8' }, cb);
}

function readCourses(cb) {
  return fs.readFile(coursesFileName, { encoding: 'utf-8' }, cb);
}

function imperativeCombineData(students, scores, courses) {
  const studentLines = students.split('\n');
  const scoreLines = scores.split('\n');
  const courseLines = courses.split(' ');
  const output = [];
  for (let j = 0; j < studentLines.length; j++) {
    const student = studentLines[j];
    const currentStudentScores = scoreLines[j];
    const currentStudentScoresArray = currentStudentScores.split(' ');
    const courses = []
    for (let i = 0; i < courseLines.length; i++) {
      const course = courseLines[i];
      const score = currentStudentScoresArray[i];
      courses.push({ name: course, score });
    }
    const item = {
      studentName: student,
      courses,
    }
    output.push(item);
  }
  return output;
}

function combineData(students, scores, courses) {
  const courseLines = courses.split(' ');
  const scoreLines = scores.split('\n');
  return students.split('\n').map((studentName, index) => {
    const studentScores = scoreLines[index];
    const courseScores = studentScores.split(' ');
    const courses = courseLines.map((name, index) => {
      const score = courseScores[index];
      return { name, score };
    });
    return { studentName, courses };
  });
}

function asyncAll(...args) {
  const cb = args[args.length - 1];
  const asyncFns = args.slice(0, -1);
  const allData = [];
  for (const fn of asyncFns) {
    fn(function (err, data) {
      if (err) return cb(err);
      allData.push(data);
      if (allData.length !== asyncFns.length) return;
      cb(null, allData);
    });
  }
}

function generateResult(cb) {
  asyncAll(readStudents, readScores, readCourses, cb);
}
generateResult(function (err, result) {
  console.log(result);
});

// function generateResult(cb) {
//   readStudents(function (err, students) {
//     if (err) return cb(err);
//     readScores(function (err, scores) {
//       if (err) return cb(err);
//       readCourses(function (err, courses) {
//         if (err) return cb(err);
//         const result = combineData(students, scores, courses);
//         cb(null, result);
//       })
//     });
//   });
// }

// generateResult(function (err, data) {
//   if (err) return console.error(err);
//   console.log(data);
// })