

import React from 'react';

const SectionMontior = () => {
  // Read the data from localStorage
//   const studentDetails = JSON.parse(localStorage.getItem('studentDetails'));
  const studentDetails = JSON.parse(localStorage.getItem('studentDetails'))
  // Define the table headings
  const headings = ['TypeOfEvent', 'nameOfEvent', 'startingTime', 'endingTime', 'certificate', 'organisation', 'levelOfEvent', 'NOC', 'memberNo', 'Approve'];

  return (
    <div>
      <h1>Student Details</h1>
      <table>
        <thead>
          <tr>
            {headings.map((heading, index) => <th key={index}>{heading}</th>)}
          </tr>
        </thead>
        <tbody>
          {studentDetails.map((detail, index) => (
            <tr key={index}>
              <td>{detail.TypeOfEvent}</td>
              <br />
              <td>{detail.nameOfEvent}</td>
              <br />
              <td>{detail.startingTime}</td>
              <br />
              <td>{detail.endingTime}</td>
              <br />
              <td><img src={detail.certificate} className='h-[200px] w-[200px]' alt="Not have Proff" /></td>
              <br />
              <td>{detail.organisation}</td>
              <br />
              <td>{detail.levelOfEvent}</td>
              <br />
              <td><img src={detail.NOC} className='h-[200px] w-[200px]' alt="Not Have Proff" /></td>
              <br />
              <td>{detail.memberNo}</td>
              <br />
              <td>{detail.Approve.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SectionMontior;
