import * as lodash from 'lodash';
import * as path from 'path';
import * as fs from 'fs';
// please refer to https://lodash.com/docs/4.17.15#template

lodash.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

/**
 *
 * @param {string} template example: 'hello {{firstName}} {{lastName}}'
 * @param {object} variables example: { firstName: 'Rassil', lastName: 'BR' }
 * @returns {string} Parsed template. example: ' hello Rassil BR '
 */
export const templateParser = (template: string, variables: any) => {
  try {
    const result = lodash.template(template);
    return result(variables);
  } catch (error) {
    throw error;
  }
};

export const loadTemplate = username => {
  const filePath = path.join(
    __dirname,
    '../../assets/templates/emailTemplate.html',
  );
  console.log({ filePath });

  const emailTemplate = fs.readFileSync(filePath, 'utf-8');
  const htmlVariables = { username };
  const htmlBody = templateParser(emailTemplate, htmlVariables);
  return htmlBody;
};
