//Customers API for all our CRUD opertations 
export default class customerAPI{
  
   static  getAllCustomers(){

        //fct Global Variables 
        var customerList = new Array();
        var resultList;
        var window = 5;
        var currentPage = 0;

        fetch('https://my.api.mockaroo.com/customers.json?key=03c46990')
        .then( (Response) => Response.json())
        .then( (result) => {
            resultList = result;
            var count = 0;
            result.forEach( (customer) => {
                
                // array that will be used to keep a local modal of the customer information
                var currentCustomer = new Array();

                //Get all the variables for the grid
                let customerNumber = customer.customer_number;
                let first_name = customer.first_name;
                let last_name = customer.last_name;
                let date_birth = customer.date_birth;
                let ssn = customer.ssn;
                let email = customer.email;
                let mobile_phone_number = customer.mobile_phone_number;
                let join_date = customer.join_date;
                let primary_address_1 = customer.primary_address.primary_address_1;
                let city = customer.primary_address.city;
                let state = customer.primary_address.state;
                let zip_code = customer.primary_address.zip_code;

                //Use the date of birth variable to find the age 
                var dob = new Date(date_birth);  
                //calculate month difference from current date  
                var month_diff = Date.now() - dob.getTime();  
                //convert the month difference in date format  
                var age_dt = new Date(month_diff);
                //Get the year from date      
                var year = age_dt.getUTCFullYear();  
                //calculate the age of customer
                var age = Math.abs(year - 1970);  
                //create an empty ssn variable for the last 4 digits. 
                var rightssn = "";

                //Handle if we get an undefined ssn input 
                if(ssn != null)
                {
                    const [leftssn,middlessn,tssn] = ssn.split('-');
                    rightssn = tssn;

                }else{
                    rightssn = "0000";
                }

                //push the customer info into our current customer array
                currentCustomer.push(customerNumber);
                currentCustomer.push(first_name);
                currentCustomer.push(last_name);
                currentCustomer.push(date_birth);
                currentCustomer.push(rightssn);
                currentCustomer.push(email);
                currentCustomer.push(mobile_phone_number);
                currentCustomer.push(join_date);
                currentCustomer.push(primary_address_1);
                currentCustomer.push(city);
                currentCustomer.push(state);
                currentCustomer.push(zip_code);

                //give ourself a record of the customer informaiton
                customerList.push(currentCustomer);
                
                // Create elments to go in the table 
                const tbody = document.querySelector("tbody");
                const tr = document.createElement("tr");
                const tdCN = document.createElement("td");
                const tdFN = document.createElement("td");
                const tdLN = document.createElement("td");
                const tdDOB = document.createElement("td");
                const tdSSN = document.createElement("td");
                const tdAge = document.createElement("td");
                const moreInfo = document.createElement("button");
            
                //Add the correct text content to the row variable
                tdCN.textContent = customerNumber;
                tdFN.textContent = first_name;
                tdLN.textContent = last_name;
                tdDOB.textContent = date_birth;
                tdSSN.textContent = rightssn;
                tdAge.textContent = age;
                moreInfo.textContent = "More Info";
                moreInfo.classList.add("btn");
                moreInfo.classList.add("btn-primary");
                moreInfo.value = count;


                // Event Listner function for the More Info button 
                moreInfo.addEventListener("click",() => {
                    //index myDialog body all created to help create the pagination buttons
                    var index = moreInfo.value;
                    var myDialog = document.createElement("dialog");
                    var body = document.querySelector(".wrapper");
                    
                    //Append the dialog box to the body of our application 
                    body.appendChild(myDialog);
                    //Iterate through customer list 
                    for( var i = 0; i<customerList.length; i++)
                    {
                        if(index == i && !myDialog.open)
                        {                            
                            var textCustomerNumber = document.createTextNode("Customer Number: "+customerList[i][0]);
                            var textFirst_name = document.createTextNode("First Name: "+customerList[i][1]);
                            var testLast_name = document.createTextNode("Last Name: "+customerList[i][2]);
                            var textDate_birth = document.createTextNode("Date Of Birth: "+customerList[i][3]);
                            var textSSN = document.createTextNode("Social Security Number: "+customerList[i][4]);
                            var textEmail = document.createTextNode("Email: "+customerList[i][5]);
                            var textMobile_phone_number = document.createTextNode("Mobile Phone Number: "+customerList[i][6]);
                            var textJoin_Date = document.createTextNode("Join Date: "+customerList[i][7]);
                            var textCity = document.createTextNode("City: "+customerList[i][9]);
                            var textState = document.createTextNode("State: "+customerList[i][10]);
                            var textZip_code = document.createTextNode("Zipcode: "+customerList[i][11]);
                            
                            const h2 = document.createElement("h3");
                            h2.textContent = "Customer Profile";

                            myDialog.appendChild(h2);

                            const line = document.createElement("hr");
                            myDialog.appendChild(line);
                            
                            const h1 = document.createElement("h1");
                            h1.style.color = "#0275d8";
                            h1.textContent = customerList[i][1]+" "+ customerList[i][2];
                            
                            myDialog.appendChild(h1);

                            myDialog.appendChild(textCustomerNumber);
                            myDialog.appendChild(document.createElement("br"));
                            myDialog.appendChild(textFirst_name);
                            myDialog.appendChild(document.createElement("br"));
                            myDialog.appendChild(testLast_name);
                            myDialog.appendChild(document.createElement("br"));
                            myDialog.appendChild(textDate_birth);
                            myDialog.appendChild(document.createElement("br"));
                            myDialog.appendChild(textSSN);
                            myDialog.appendChild(document.createElement("br"));
                            myDialog.appendChild(textEmail);
                            myDialog.appendChild(document.createElement("br"));
                            myDialog.appendChild(textMobile_phone_number);
                            myDialog.appendChild(document.createElement("br"));
                            myDialog.appendChild(textJoin_Date);
                            myDialog.appendChild(document.createElement("br"));
                            myDialog.appendChild(textCity);
                            myDialog.appendChild(document.createElement("br"));
                            myDialog.appendChild(textState);
                            myDialog.appendChild(document.createElement("br"));
                            myDialog.appendChild(textZip_code);
                            myDialog.appendChild(document.createElement("br"));

                            const closeButton = document.createElement("button");
                            closeButton.classList.add("btn");
                            closeButton.classList.add("btn-primary");
                            closeButton.textContent = "Close";

                            myDialog.appendChild(closeButton);
                            myDialog.classList.add("myModal");

                            closeButton.addEventListener("click",() => {
                                myDialog.close();
                            })
                            
                            myDialog.showModal();
                        }
                        else if (index == i)
                        {
                            myDialog.closeModal();
                        }
                    }
                    let infoModal = document.getElementById("infoModal");
                });

                //append the childern to the row
                tr.appendChild(tdCN);
                tr.appendChild(tdFN);
                tr.appendChild(tdLN);
                tr.appendChild(tdDOB);
                tr.appendChild(tdSSN);
                tr.appendChild(tdAge);
                tr.appendChild(moreInfo);

                //append the row to the table body
                tbody.appendChild(tr);     
                //increment our counter. 
                count++;
            });
            //Get the root of the document and set the total customer items per page 
            const root = document.querySelector(".wrapper");
            const itemsPerPage = 7;

            //get the rows from the table 
            const items = Array.from(root.getElementsByTagName("tr")).slice(1);            
                
            //Hide rows in table that should not be seen 
            const startIndex = currentPage * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            items.forEach((item,index)=>{
                item.classList.toggle("hidden", index < startIndex || index >= endIndex);
            })
            //Get list of items for the current page
            const pageItems = items.slice(startIndex,endIndex);
            // The total Page amount 
            const totalPages = Math.ceil(items.length / itemsPerPage);
            //Load the total page buttons based on the page amount 
            loadPageButtons(totalPages,currentPage);

            // create the click action to create the form for adding customer infomation 
            onClickForm();
        })
        .catch( (error) => console.log(error));// Catch any errors

        // View Customers link on click function
        $('#ViewCustomers').on('click',function(){
            if( document.querySelector('.formBackground').style.display != "none")
            {
                closeForm();
            }
            $('.tabular--wrapper').toggle();
        })

        function onClickForm(){
             $('#CreateNewUser').on('click',function(){
                if(document.querySelector('.tabular--wrapper').style.display != "none")
                {
                    $('.tabular--wrapper').toggle();
                }
                if(document.querySelector('.formBackground').style.display !="none")
                {
                    closeForm();
                }else{
                    openForm();
                }
            })

            // Form on click close function
            $('#closeButton').on('click',function(){
                closeForm();
            })

            //Make new customerInfo array to keep track of customer info
            var newCustomerInfo = new Array();
            //New  Submit Button for on click events 
            const submitButton = document.querySelector("#submitButton");

            //Submit button on click validation function 
            submitButton.addEventListener('click',function(){
                newCustomerInfo.length = 0;
                var readyToSubmit = true;
                
                    var formCustNum = document.getElementById("customerNumber")                
                    const value1 = formCustNum.value;
                    newCustomerInfo.push(value1);
                    const regex1 = /\b\d{5}\b/;

                    if(!regex1.test(value1))
                    {
                        readyToSubmit = false;
                    }
                    if(!regex1.test(value1) && document.querySelector('#customerNumberError').style.display == "none")
                    {
                        $("#customerNumberError").toggle();
                    }else if (regex1.test(value1) && document.querySelector('#customerNumberError').style.display != "none"){
                        $("#customerNumberError").toggle();
                    }
              
    
                    var formFN = document.getElementById("firstName")
           
                    const value2 = formFN.value;
                    newCustomerInfo.push(value2);
                    const regex2 = /[ A-Za-z]/;

                    if(!regex2.test(value2))
                    {
                        readyToSubmit = false;
                    }

                    if(!regex2.test(value2) && document.querySelector('#firstNameError').style.display == "none" )
                    {
                        $("#firstNameError").toggle();
                    }else if (regex2.test(value2) && document.querySelector('#firstNameError').style.display != "none"){
                        $("#firstNameError").toggle();
                    }
              
                    
                var formLN = document.getElementById("lastName")
               
                    const value3 = formLN.value;
                    newCustomerInfo.push(value3);
                    const regex3 = /[ A-Za-z]/;

                    if(!regex3.test(value3))
                    {
                        readyToSubmit = false;
                    }

                    if(!regex3.test(value3) && document.querySelector('#lastNameError').style.display == "none" )
                    {
                        $("#lastNameError").toggle();
                    }else if (regex3.test(value3) && document.querySelector('#lastNameError').style.display != "none"){
                        $("#lastNameError").toggle();
                    }

                    var formDOB = document.getElementById("dob")

                    const value4 = formDOB.value;
                    newCustomerInfo.push(value4);
                    const regex4 = /(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/;

                    if(!regex4.test(value4))
                    {
                        readyToSubmit = false;
                    }
                    if(!regex4.test(value4) && document.querySelector('#dobError').style.display == "none")
                    {
                        $("#dobError").toggle();
                    }else if (regex4.test(value4) && document.querySelector('#dobError').style.display != "none"){
                        $("#dobError").toggle();
                    }
           
    
                    var formSSN = document.getElementById("SSN")
                
                    const value5 =formSSN.value;
                    newCustomerInfo.push(value5);
                    const regex5 = /^(?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4}$/;
                    if(!regex5.test(value5))
                    {
                        readyToSubmit = false;
                    }
                    if(!regex5.test(value5) && document.querySelector('#SSNError').style.display == "none")
                    {
                        $("#SSNError").toggle();
                    }else if (regex5.test(value5) && document.querySelector('#SSNError').style.display != "none"){
                        $("#SSNError").toggle();
                    }
             
    
                    var formEmail= document.getElementById("email")
               
                    const value6 = formEmail.value;
                    newCustomerInfo.push(value6);
                    const regex6 = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
                    if(!regex6.test(value6))
                    {
                        readyToSubmit = false;
                    }

                    if(!regex6.test(value6) && document.querySelector('#emailError').style.display == "none")
                    {
                        $("#emailError").toggle();
                    }else if (regex6.test(value6) && document.querySelector('#emailError').style.display != "none"){
                        $("#emailError").toggle();
                    }
              
                var formAdd= document.getElementById("Address")
                
                    const value7 = formAdd.value;
                    newCustomerInfo.push(value7);
                    const regex7 = /[A-Za-z0-9'\.\-\s\,]/;

                    if(!regex7.test(value7))
                    {
                        readyToSubmit = false;
                    }

                    if(!regex7.test(value7) && document.querySelector('#AddressError').style.display == "none")
                    {
                        $("#AddressError").toggle();
                    }else if (regex7.test(value7) && document.querySelector('#AddressError').style.display != "none"){
                        $("#AddressError").toggle();
                    }
             
    
                    var formCity = document.getElementById("City")
                
                    const value8 = formCity.value;
                    newCustomerInfo.push(value8);
                    const regex8 = /[ A-Za-z]/;

                    if(!regex8.test(value8))
                    {
                        readyToSubmit = false;
                    }

                    if(!regex8.test(value8) && document.querySelector('#CityError').style.display == "none")
                    {
                        $("#CityError").toggle();
                    }else if (regex8.test(value8) && document.querySelector('#CityError').style.display != "none"){
                        $("#CityError").toggle();
                    }
             
    
                    var formZipcode = document.getElementById("Zipcode")
                
                    const value9 = formZipcode.value;
                    newCustomerInfo.push(value9);
                    const regex9 = /\b\d{5}\b/;

                    if(!regex9.test(value9))
                    {
                        readyToSubmit = false;
                    }

                    if(!regex9.test(value9) && document.querySelector('#ZipcodeError').style.display == "none")
                    {
                        $("#ZipcodeError").toggle();
                    }else if (regex9.test(value9) && document.querySelector('#ZipcodeError').style.display != "none"){
                        $("#ZipcodeError").toggle();
                    }

                    var formPN = document.getElementById("PhoneNumber")
                    
                    const value_ = formPN.value;
                    newCustomerInfo.push(value_);
                    const regex_ = /^(?:\(\d+\)|\d+)-\d+-\d+$/;

                    if(!regex_.test(value_))
                    {
                        readyToSubmit = false;
                    }

                    if(!regex_.test(value_) && document.querySelector('#PhoneNumberError').style.display == "none" )
                    {
                        $("#PhoneNumberError").toggle();
                    }else if (regex_.test(value_) && document.querySelector('#PhoneNumberError').style.display != "none"){
                        $("#PhoneNumberError").toggle();
                    }

                // Event handler to prevent Screen From Reloading on Submit 
                var form = document.querySelector("form");
                function handleForm(event) { event.preventDefault(); } 
                form.addEventListener('submit', handleForm);
             
                //If readyToSubmit is true submit the form and then close it 
                if(readyToSubmit == true)
                {
                    submitForm(newCustomerInfo);
                    closeForm();
                }
            })

            // POST customer Data to Mock API
            function submitForm(CustomerInfo){
                //Get customer form Data for to be sent to the Mock API
                var formData ={
                    
                    'Customer Number': CustomerInfo[0],
                    'First Name' : CustomerInfo[1],
                    'Last Name'  : CustomerInfo[2],
                    'Date of Birth' : CustomerInfo[3],
                    'SSN' : CustomerInfo[4],
                    'Email address' : CustomerInfo[5],
                    'Primary address' : CustomerInfo[6] + " " + CustomerInfo[7] +" "+ CustomerInfo[8],
                    'Mobile phone number' : CustomerInfo[9],
                };

                // Post the data to the mock API
                $.ajax({
                    url: "https://my.api.mockaroo.com/customers.json?key=03c46990",
                    type: "post",
                    data: formData,
                    success: function(result) {
                        console.log(result);
                    },
                    error: function(xhr,status, error)
                    {
                        console.log(xhr.responseJSON.message + " "+ status + " "+ error);
                    }
                });
            }
            
            // Event listener for the Form Click events 
            var formCustNum = document.getElementById("customerNumber")
            formCustNum.addEventListener('input',(event)=>{
                const value = event.target.value;
                newCustomerInfo.push(value);
                const regex = /\b\d{5}\b/;
                if(!regex.test(value) && document.querySelector('#customerNumberError').style.display == "none")
                {
                    $("#customerNumberError").toggle();
                }else if (regex.test(value) && document.querySelector('#customerNumberError').style.display != "none"){
                    $("#customerNumberError").toggle();
                }
            });

            var formFN = document.getElementById("firstName")
            formFN.addEventListener('input',(event)=>{
                const value = event.target.value;
                newCustomerInfo.push(value);
                const regex = /[ A-Za-z]/;
                if(!regex.test(value) && document.querySelector('#firstNameError').style.display == "none" )
                {
                    $("#firstNameError").toggle();
                }else if (regex.test(value) && document.querySelector('#firstNameError').style.display != "none"){
                    $("#firstNameError").toggle();
                }
            });

            var formLN = document.getElementById("lastName")
            formLN.addEventListener('input',(event)=>{
                const value = event.target.value;
                newCustomerInfo.push(value);
                const regex = /[ A-Za-z]/;
                if(!regex.test(value) && document.querySelector('#lastNameError').style.display == "none")
                {
                    $("#lastNameError").toggle();
                }else if (regex.test(value) && document.querySelector('#lastNameError').style.display != "none"){
                    $("#lastNameError").toggle();
                }
            });

            var formDOB = document.getElementById("dob")
            formDOB.addEventListener('input',(event)=>{
                const value = event.target.value;
                newCustomerInfo.push(value);
                const regex = /(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/;
                if(!regex.test(value) && document.querySelector('#dobError').style.display == "none")
                {
                    $("#dobError").toggle();
                }else if (regex.test(value) && document.querySelector('#dobError').style.display != "none"){
                    $("#dobError").toggle();
                }
            });

            var formSSN = document.getElementById("SSN")
            formSSN.addEventListener('input',(event)=>{
                const value = event.target.value;
                newCustomerInfo.push(value);
                const regex = /^(?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4}$/;
                if(!regex.test(value) && document.querySelector('#SSNError').style.display == "none")
                {
                    $("#SSNError").toggle();
                }else if (regex.test(value) && document.querySelector('#SSNError').style.display != "none"){
                    $("#SSNError").toggle();
                }
            });

            var formEmail= document.getElementById("email")
            formEmail.addEventListener('input',(event)=>{
                const value = event.target.value;
                newCustomerInfo.push(value);
                const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
                if(!regex.test(value) && document.querySelector('#emailError').style.display == "none")
                {
                    $("#emailError").toggle();
                }else if (regex.test(value) && document.querySelector('#emailError').style.display != "none"){
                    $("#emailError").toggle();
                }
            });

            var formAdd= document.getElementById("Address")
            formAdd.addEventListener('input',(event)=>{
                const value = event.target.value;
                newCustomerInfo.push(value);
                const regex = /[A-Za-z0-9'\.\-\s\,]/;
                if(!regex.test(value) && document.querySelector('#AddressError').style.display == "none")
                {
                    $("#AddressError").toggle();
                }else if (regex.test(value) && document.querySelector('#AddressError').style.display != "none"){
                    $("#AddressError").toggle();
                }
            });

            var formCity = document.getElementById("City")
            formCity.addEventListener('input',(event)=>{
                const value = event.target.value;
                newCustomerInfo.push(value);
                const regex = /[ A-Za-z]/;
                if(!regex.test(value) && document.querySelector('#CityError').style.display == "none")
                {
                    $("#CityError").toggle();
                }else if (regex.test(value) && document.querySelector('#CityError').style.display != "none"){
                    $("#CityError").toggle();
                }
            });

            var formZipcode = document.getElementById("Zipcode")
            formZipcode.addEventListener('input',(event)=>{
                const value = event.target.value;
                newCustomerInfo.push(value);
                const regex = /\b\d{5}\b/;
                if(!regex.test(value) && document.querySelector('#ZipcodeError').style.display == "none")
                {
                    $("#ZipcodeError").toggle();
                }else if (regex.test(value) && document.querySelector('#ZipcodeError').style.display != "none"){
                    $("#ZipcodeError").toggle();
                }
            });
            
            var formFN = document.getElementById("PhoneNumber")
            formFN.addEventListener('input',(event)=>{
                const value = event.target.value;
                newCustomerInfo.push(value);
                const regex = /^(?:\(\d+\)|\d+)-\d+-\d+$/;
                if(!regex.test(value) && document.querySelector('#PhoneNumberError').style.display == "none" )
                {
                    $("#PhoneNumberError").toggle();
                }else if (regex.test(value) && document.querySelector('#PhoneNumberError').style.display != "none"){
                    $("#PhoneNumberError").toggle();
                }
            });
        }

       //Open New Customer Form
        function openForm(){
            document.querySelector(".formBackground").style.display = "inline";
        }

        //Close New Customer Form
        function closeForm(){
            document.querySelector(".formBackground").style.display = "none";
        }

        //Loads the page buttons based on the number of pages 
        function loadPageButtons(pages,CP){ 
             const wrapper = document.getElementById('pagination-wrapper');
             wrapper.innerHTML = '';

             //Get the max left/right page buttons
             var maxLeft = (CP - Math.floor(window/2))
             var maxRight = (CP + Math.floor(window/2))

            if(maxLeft < 1){
                maxLeft = 1;
                maxRight = window;
            }

            if(maxRight > pages - 1){
                maxLeft = (pages - 1) - (window -1);
                maxRight = pages-1;
                if(maxLeft < 1){
                    maxLeft =1;
                }
            }
            //For each page calculate the max left and right buttons
            //and move these to the wrapper innerHTML to create the buttons
             for (var page = maxLeft; page <= maxRight+1; page++){
                 var pageIndex = page;
                 wrapper.innerHTML += `<div class = "page-item""><button value = ${pageIndex-1} class = "page-link btn-info page"  style="background-color:rgba(28, 20, 20, 0.3);">${pageIndex}</button></div>`;
             }

             if(currentPage != 1)
             {
                wrapper.innerHTML = `<div class = "page-item""><button value = ${0} class = "page-link btn-info page"  style="background-color:rgba(28, 20, 20, 0.3);">&#171; First</button></div>` + wrapper.innerHTML;
             }

             if(currentPage != pages)
             {
                wrapper.innerHTML += `<div class = "page-item""><button value = ${pages - 1} class = "page-link btn-info page"  style="background-color:rgba(28, 20, 20, 0.3);">Last &#187;</button></div>` ;
             }

             //Page button On click functionality to update the table and page buttons
             $('.page').on('click', function() {
                $('#table-body').empty();
                let currentPage = Number($(this).val());
                buildTable(currentPage);
             })
        }

        // Builds the customer table to view all customers 
        function buildTable(currentPage){
            var count = 0;
            resultList.forEach( (customer) => {
                
                //Variables to keep track of the currenst customer
                var currentCustomer = new Array();
                const readCustomer = document.createElement("li");

                //Get all the variables for the grid
                let customerNumber = customer.customer_number;
                let first_name = customer.first_name;
                let last_name = customer.last_name;
                let date_birth = customer.date_birth;
                let ssn = customer.ssn;
                let email = customer.email;
                let mobile_phone_number = customer.mobile_phone_number;
                let join_date = customer.join_date;
                let primary_address_1 = customer.primary_address.primary_address_1;
                let city = customer.primary_address.city;
                let state = customer.primary_address.state;
                let zip_code = customer.primary_address.zip_code;
                var dob = new Date(date_birth);  
    
                //calculate month difference from current date  
                var month_diff = Date.now() - dob.getTime();  
      
                //convert the month difference in date format  
                var age_dt = new Date(month_diff);
      
                //Get the year from date      
                var year = age_dt.getUTCFullYear();  
      
                //calculate the age of customer
                var age = Math.abs(year - 1970);  
                
                //Variable for last 4 digits of social. 
                var rightssn = "";

               //Handle if we get an undefined ssn input 
               if(ssn != null)
               {
                   const [leftssn,middlessn,tssn] = ssn.split('-');
                   rightssn = tssn;

               }else{
                   //Give ssn a value of 0000 if not disclosed in the result from the api call
                   rightssn = "0000";
               }

                //push the customer info into our current customer array
                currentCustomer.push(customerNumber);
                currentCustomer.push(first_name);
                currentCustomer.push(last_name);
                currentCustomer.push(date_birth);
                currentCustomer.push(rightssn);
                currentCustomer.push(email);
                currentCustomer.push(mobile_phone_number);
                currentCustomer.push(join_date);
                currentCustomer.push(primary_address_1);
                currentCustomer.push(city);
                currentCustomer.push(state);
                currentCustomer.push(zip_code);
                
                //Make a list of records of the customer information
                customerList.push(currentCustomer);

                // Create elments to go in the table 
                const tbody = document.querySelector("tbody");
                const tr = document.createElement("tr");
                const tdCN = document.createElement("td");
                const tdFN = document.createElement("td");
                const tdLN = document.createElement("td");
                const tdDOB = document.createElement("td");
                const tdSSN = document.createElement("td");
                const tdAge = document.createElement("td");
                const moreInfo = document.createElement("button");
            
                //Add the correct text content to the row variable
                tdCN.textContent = customerNumber;
                tdFN.textContent = first_name;
                tdLN.textContent = last_name;
                tdDOB.textContent = date_birth;
                tdSSN.textContent = rightssn;
                tdAge.textContent = age;
                moreInfo.textContent = "More Info";
                moreInfo.classList.add("btn");
                moreInfo.classList.add("btn-primary");
                moreInfo.value = count;

                moreInfo.addEventListener("click",() => {
                    // Create variables for index , body and myDialog 
                    // will use these to create the information in the modal popup 
                    var index = moreInfo.value;
                    var myDialog = document.createElement("dialog");
                    var body = document.querySelector(".wrapper");
                    
                    body.appendChild(myDialog);

                    //Create Customer Table 
                    for( var i = 0; i<customerList.length; i++)
                    {
                        if(index == i && !myDialog.open)
                        {                            
                            var textCustomerNumber = document.createTextNode("Customer Number: "+customerList[i][0]);
                            var textFirst_name = document.createTextNode("First Name: "+customerList[i][1]);
                            var testLast_name = document.createTextNode("Last Name: "+customerList[i][2]);
                            var textDate_birth = document.createTextNode("Date Of Birth: "+customerList[i][3]);
                            var textSSN = document.createTextNode("Social Security Number: "+customerList[i][4]);
                            var textEmail = document.createTextNode("Email: "+customerList[i][5]);
                            var textMobile_phone_number = document.createTextNode("Mobile Phone Number: "+customerList[i][6]);
                            var textJoin_Date = document.createTextNode("Join Date: "+customerList[i][7]);
                            //var textPrimary_Address_1 = document.createTextNode("Primary Address: "+customerList[i][8]);
                            var textCity = document.createTextNode("City: "+customerList[i][9]);
                            var textState = document.createTextNode("State: "+customerList[i][10]);
                            var textZip_code = document.createTextNode("Zipcode: "+customerList[i][11]);

                            const h2 = document.createElement("h3");
                            h2.textContent = "Customer Profile";
                            myDialog.appendChild(h2);

                            const line = document.createElement("hr");
                            myDialog.appendChild(line);
                            
                            const h1 = document.createElement("h1");
                            h1.style.color = "#0275d8";
                            h1.textContent = customerList[i][1]+" "+ customerList[i][2];

                            myDialog.appendChild(h1);

                            myDialog.appendChild(textCustomerNumber);
                            myDialog.appendChild(document.createElement("br"));
                            myDialog.appendChild(textFirst_name);
                            myDialog.appendChild(document.createElement("br"));
                            myDialog.appendChild(testLast_name);
                            myDialog.appendChild(document.createElement("br"));
                            myDialog.appendChild(textDate_birth);
                            myDialog.appendChild(document.createElement("br"));
                            myDialog.appendChild(textSSN);
                            myDialog.appendChild(document.createElement("br"));
                            myDialog.appendChild(textEmail);
                            myDialog.appendChild(document.createElement("br"));
                            myDialog.appendChild(textMobile_phone_number);
                            myDialog.appendChild(document.createElement("br"));
                            myDialog.appendChild(textJoin_Date);
                            myDialog.appendChild(document.createElement("br"));
                            myDialog.appendChild(textCity);
                            myDialog.appendChild(document.createElement("br"));
                            myDialog.appendChild(textState);
                            myDialog.appendChild(document.createElement("br"));
                            myDialog.appendChild(textZip_code);
                            myDialog.appendChild(document.createElement("br"));

                            const closeButton = document.createElement("button");
                            closeButton.classList.add("btn");
                            closeButton.classList.add("btn-primary");
                            closeButton.textContent = "Close";

                            myDialog.appendChild(closeButton);
                            myDialog.classList.add("myModal");

                            closeButton.addEventListener("click",() => {
                                myDialog.close();
                            })
                            
                            myDialog.showModal();
                        }
                        else if (index == i)
                        {
                            myDialog.closeModal();
                        }
                    }
                    let infoModal = document.getElementById("infoModal");
                });

                //append the childern to the row
                tr.appendChild(tdCN);
                tr.appendChild(tdFN);
                tr.appendChild(tdLN);
                tr.appendChild(tdDOB);
                tr.appendChild(tdSSN);
                tr.appendChild(tdAge);
                tr.appendChild(moreInfo);

                //append the row to the table body
                tbody.appendChild(tr);     
                count++;
            });

            const root = document.querySelector(".wrapper");
            const itemsPerPage = 7;
            
            //get the rows from the table 
            const items = Array.from(root.getElementsByTagName("tr")).slice(1);            
             
            //Hide rows in table that should not be seen 
            const startIndex = currentPage * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            items.forEach((item,index)=>{
                item.classList.toggle("hidden", index < startIndex || index >= endIndex);
            })

            // Create totalpages to pass to our load page buttons function
            // This will reload the pagination buttons
            const totalPages = Math.ceil(items.length / itemsPerPage);
            //Load the page buttons 
            loadPageButtons(totalPages,currentPage);
        }
    }

}