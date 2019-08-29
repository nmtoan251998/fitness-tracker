module.exports.liveData = (req, res, next) => {
    try {
        const { 
            heart_rate,
            steps,
            fat_gramms,
            meters,
            callories,
        } = req.body;

        return res.status(200).json(heart_rate,
            steps,
            fat_gramms,
            meters,
            callories).end();
    } catch (error) {
        next(error)
    }
}