import { ApiProperty } from '@nestjs/swagger';

export class MailingSendModel {
  @ApiProperty({
    example: 'Rassilo',
  })
  username: string;

  @ApiProperty({
    example: 'this is a subject',
  })
  subject: string;

  @ApiProperty({
    example: 'rassil.benrhouma@esprit.tn',
  })
  to: string;

  @ApiProperty({
    example: 'contact@laevitas.ch',
  })
  from: string;
}

export const toTitleCase = str => {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
export const btnStyle = `style="border-radius: 4px;
background: #1e274b;
/* fallback for old browsers */
background: -webkit-linear-gradient(to right, #243B55, #1e274b);
/* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #243B55, #1e274b);
/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
border: none;
color: #FFFFFF;
text-align: center;
text-transform: uppercase;
font-size: 13px;
padding: 10px;
text-decoration: unset;
width: 200px;
transition: all 0.4s;
cursor: pointer;
margin: 5px;"`;

export const textStyle = `style="font-size:18px"`;

export const profileStyle = `style="height: 100px;
width: 100px;
object-fit: cover;
border-radius: 100%;"`;
export const btoa = string => {
  const url = encodeURIComponent(Buffer.from(string).toString('base64'));
  return url;
};
