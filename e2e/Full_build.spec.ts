import { test, expect } from '@playwright/test';

test('ICHRA Build', async ({ page }) => {
  await page.goto('https://app.takecommandhealth.com/enroll-business/ichra-enrollment');
  await page.getByText('Accept');

  //page 1 - Company info
  await page.getByPlaceholder('Company Name').fill('a');
  
  await page.getByPlaceholder('Address').fill('b');
  await page.getByPlaceholder('Suite/Apt (optional)').fill('c');

  await page.getByPlaceholder('City').fill('d');
  await page.getByRole('combobox').first().selectOption('TN');
  await page.getByPlaceholder('Zip').fill('75287');
  await page.getByPlaceholder('Name', { exact: true }).fill('e');
  await page.getByPlaceholder('Email').fill('f@gmail.com');
  await page.getByPlaceholder('Phone Number').fill('9729480719');
  await page.getByRole('combobox').nth(1).selectOption('s-corp');
  await page.getByRole('button', { name: 'Continue' }).click();

  //page 2 - reimbursement info
  await page.getByLabel('', { exact: true }).selectOption('2024-03-01');
  
  let reimbursement_freq = "Monthly (recommended)"

  if (reimbursement_freq == "Monthly (recommended)") {
    await page.getByText('Monthly').click();
  } 
  else if (reimbursement_freq == "Twice per month") {
    await page.getByText('Twice per Month').click();
  } 
  else if (reimbursement_freq == "Every other week") {
    await page.getByText('Every other Week').click();
    //await page.getByPlaceholder('Enter start date').fill('2024-03-01');
  } 
  else {
    console.log("Error: reimbursement frequency missing");
  }

  let poc_freq = "Annually (recommended)"

  if (poc_freq == "Annually (recommended)") {
    await page.getByText('Annually').click();
  }
  else if (poc_freq == "Quarterly") {
    await page.getByText('Quarterly').click();
  }

  await page.getByPlaceholder('Total Employees').fill('20');
  
  
  await page.getByText('No', { exact: true }).click(); //group plan for portion of EEs? 
  await page.getByRole('button', { name: 'Continue' }).click();

  //page 3 - reimbursement class setup 

  // class is setup for all same amount, need to extrapolate code for multiple classes
  await page.getByText('All EmployeesSame Amount').click();
  await page.getByPlaceholder('Amount').fill('200');

  await page.getByText('assignmentInsurancePremiums').click();

  let waiting_period = "Immediately"

  if (waiting_period == "Immediately") {
    await page.getByText('0 Days', { exact: true }).click();
  }
  else if (waiting_period == "") {
    await page.getByText('30 Days').click();
  }
  else if (waiting_period == "The first of the month after 30 days (60 days)") {
    await page.getByText('60 Days').click();
  }
  else if (waiting_period == "The first of the month after 60 days (90 days)") {
    await page.getByText('90 Days').click();
  }

  await page.getByRole('button', { name: 'Continue' }).click();

  //page 4 - Roster (adding Admin)
  
  await page.getByRole('link', { name: 'edit edit' }).click();
  await page.getByPlaceholder('First name').fill('a');
  await page.getByPlaceholder('Last name').fill('b');
  await page.getByPlaceholder('Date of Birth').fill('01/01/1980');
  await page.getByPlaceholder('Email').fill('c@gmail.com');
  await page.getByPlaceholder('Hire date').fill('01/01/2023');
  await page.getByPlaceholder('Email').click();
  page.getByRole('button', { name: 'Done' });


  await page.getByRole('button', { name: 'Continue' }).click();
});