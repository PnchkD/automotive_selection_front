import $ from "jquery"

var showCounter = 0;
var successShowCounter = 0;

class ErrorHandler{

    static runError(data){
        const hideValue = ++showCounter
        $("#alert-danger").show();
        if(data.status === 403){
            $("#alert-danger").html("Not authorized")
        }
        if(data.status === 400){
            $("#alert-danger").html("Invalid data")
        } else {
        $("#alert-danger").html(data.responseJSON.code)        
        }

        setTimeout(function() { 
            if(showCounter == hideValue){
                $("#alert-danger").hide();
            }
        }, 3000);
    }
    
    static runSuccess(data){
        const hideValue = ++successShowCounter
        $("#alert-success").show();
        $("#alert-success").html(data.message)        

        setTimeout(function() { 
            if(successShowCounter == hideValue){
                $("#alert-success").hide();
            }
        }, 3000);
    }
}

export default ErrorHandler;