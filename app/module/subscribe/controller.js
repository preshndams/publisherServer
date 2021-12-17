import * as service from './service';

export async function create(req, res, next){
    try {
        res.status(200).json(await service.create(req.params,req.body));
    } catch (err) {
        next(err)
    }
}