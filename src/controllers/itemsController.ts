import { FastifyRequest, FastifyReply } from "fastify";
import * as ItemsService from "../services/itemsService"
import {ItemsData} from "../interfaces/items";
import {ConflictError, DBError, NotFoundError} from "../interfaces/my-error";
import * as typeGuard from "../helpers/typeGuard";


export class ItemsController {
  //全件取得
  async getList(req: FastifyRequest, res :FastifyReply){
    try {
      const result = await ItemsService.getList();
      const resData: ItemsData[] = result;
      res.status(200);
      res.send(resData);
    }
    catch (e) {
      res.status(500);
      res.send();
    }
  }

  //１件作成
  async post(req: FastifyRequest, res :FastifyReply){
    const body = req.body as any;
    //作成に必要なデータの確認
    if (!body.id || !body.name || !body.heal || !body.price) {
      res.status(400);
      res.send({ message: "Invalid parameters or body." });
      return;
    }

    let id: number;
    let name: string;
    let heal: number;
    let price: number;
    //パラメータの型チェック
    if(typeGuard.numberCheck(body.id) &&
      typeGuard.stringCheck(body.name) &&
      typeGuard.numberCheck(body.heal) &&
      typeGuard.numberCheck(body.price)) {
      id = body.id
      name = body.name;
      heal = body.heal;
      price = body.price;
    }
    else{
      res.status(400);
      res.send();
      return;
    }

    //編集データ
    const putData: ItemsData = {
      'id': id,
      'name': name,
      'heal': heal,
      'price': price,
    }

    try {
      await ItemsService.create(putData);
      res.status(200);
      res.send();
    }
    catch (e) {
      if (e instanceof ConflictError) {
        res.status(409);
        res.send();
      }
    }
  }

  //１件取得
  async get(req: FastifyRequest, res :FastifyReply){
    const params = req.params as any;
    //パラメータの存在チェック
    if (!params.id) {
      res.status(400);
      res.send();
      return;
    }

    //パラメータの型チェックと変換
    const id = parseInt(params.id);
    if (isNaN(id)) {
      res.status(400);
      res.send();
      return;
    }

    try {
      const result = await ItemsService.getRecode(id);
      const resData: ItemsData = result;
      res.status(200);
      res.send(resData);
    }
    catch (e) {
      if (e instanceof NotFoundError) {
        res.status(404);
        res.send();
      }
    }
  }

  //１件編集
  async put(req: FastifyRequest, res :FastifyReply){
    const params = req.params as any;
    const body = req.body as any;
    //編集に必要なデータの確認
    if (!params.id || !body.name || !body.heal || !body.price) {
      res.status(400);
      res.send();
      return;
    }

    //パラメータの型チェックと変換
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      res.status(400);
      res.send();
      return;
    }

    let name: string;
    let heal: number;
    let price: number;
    //パラメータの型チェック
    if(typeGuard.stringCheck(body.name) &&
       typeGuard.numberCheck(body.heal) &&
       typeGuard.numberCheck(body.price)) {
      name = body.name;
      heal = body.heal;
      price = body.price;
    }
    else{
      res.status(400);
      res.send();
      return;
    }

    //編集データ
    const putData: ItemsData = {
      'id': id,
      'name': name,
      'heal': heal,
      'price': price,
    }

    try {
      await ItemsService.edit(putData);
      res.status(200);
      res.send();
    }
    catch (e) {
      if (e instanceof NotFoundError) {
        res.status(404);
        res.send();

      }
    }
  }

  //１件物理削除
  async delete(req: FastifyRequest, res :FastifyReply){
    const params = req.params as any;
    //パラメータの存在チェック
    if (!params.id) {
      res.status(400);
      res.send();
      return;
    }

    //パラメータの型チェックと変換
    const id = parseInt(params.id);
    if (isNaN(id)) {
      res.status(400);
      res.send();
      return;
    }

    try {
      await ItemsService.dataDelete(id);
      res.status(200);
      res.send();
    }
    catch (e) {
      if (e instanceof NotFoundError) {
        res.status(404);
        res.send();
      }
    }
  }
}
