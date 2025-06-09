let isValid = function(s) {
    let stack = [], length = s.length;
    if(length % 2) return false;
    for(let item of s){
        switch(item){
            case "{":
            case "[":
            case "(":
                stack.push(item);
                break;
            case "}":
                if(stack.pop() !== "{") return false;
                break;
            case "]":
                if(stack.pop() !== "[") return false;
                break;
            case ")":
                if(stack.pop() !== "(") return false;
                break;
        }
    }
    return !stack.length;
};
