import aj from '../config/aj.js';
const ajmw = async(req, res, next) => {
    try {
    const decision = await aj.protect(req,{requested: 1});
    if (decision.isDenied()) {
        if(decision.reason.isRateLimit()) 
            return res.status(429).send("Too many requests - Rate limit exceeded");
        
        if(decision.reason.isBot())
            return res.status(403).send("Access denied - Bot traffic detected");
        
        return res.status(403).send("Access denied");
        }

        next();
        
    } catch (error) {
        console.error('Arcjet middleware error:', error);
        next(error);
        
    }}
    export default ajmw;