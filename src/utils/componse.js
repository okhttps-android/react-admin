

export  function componse(...fns){
    return fns.reduce((a,b)=>(...args)=>a(b(...args)));
}
