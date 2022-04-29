import $ from "jquery"

var showCounter = 0;

class ErrorHandler{

    static runError(code, message){
        const hideValue = ++showCounter
        $("#alert-danger").show();
        if(code === 403){
            $("#alert-danger").html("Not authorized")
        }
        if(code === 400){
            $("#alert-danger").html(message)
        } else {
        $("#alert-danger").html(message)        
        }

        setTimeout(function() { 
            if(showCounter == hideValue){
                $("#alert-danger").hide();
            }
        }, 3000);
    }

    static runError(message){
        const hideValue = ++showCounter
        $("#alert-danger").show();
        $("#alert-danger").html(message)
        setTimeout(function() { 
            if(showCounter == hideValue){
                $("#alert-danger").hide();
            }
        }, 3000);
    }
    
    static runSuccess(data){
        $("#alert-success").show();
        $("#alert-success").html(data)        

        setTimeout(function() { 
                $("#alert-success").hide();
        }, 3000);
    }
}

export default ErrorHandler;