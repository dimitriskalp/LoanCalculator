// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    //Hide Results
    document.getElementById('results').style.display = 'none';


    //Show loader

    document.getElementById('loading').style.display = 'block';
    setTimeout(calculateResults,2000);

    e.preventDefault()
});

function calculateResults(){
    console.log('Calculating...');
    //UI vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const mounthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');
    
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest)/(x-1);

    if(isFinite(monthly)){
        mounthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);

        //Show Results
        document.getElementById('results').style.display = 'block';

        //Hide loader
        document.getElementById('loading').style.display = 'none';
    }else{
        showError('Please check your numbers')
    }
}

function showError(error){
    //Show Results
    document.getElementById('results').style.display = 'none';

    //Hide loader
    document.getElementById('loading').style.display = 'none';
    //Create div
    const errorDiv =document.createElement('div');

    //get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading')

    //Add class
    errorDiv.className = 'alert alert-danger';

    //Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    //Insert error above heading
    card.insertBefore(errorDiv, heading);

    //Clear error after 3 sec
    setTimeout(clearError, 3000); //miliseconds
}

//Clear errror
function clearError(){
    document.querySelector('.alert').remove();
}