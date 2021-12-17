import * as service from './service';

export async function create(req, res, next){
    try {
        res.status(200).json(await service.create(req.body));
    } catch (err) {
        next(err)
    }
}

export async function list(req, res, next){
    try {
        res.status(200).json(await service.list());
    } catch (err) {
        next(err)
    }
}