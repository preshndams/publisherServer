import * as service from "./service";

export async function create(req, res, next) {
  try {
    res.status(200).json(await service.create(req.params, req.body));
  } catch (err) {
    next(err);
  }
}

export async function viewMessage(req, res, next) {
  try {
    res.status(200).json(await service.viewMessage( req.body));
  } catch (err) {
    next(err);
  }
}
