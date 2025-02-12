import {
  Action,
  Command,
  Ctx,
  Hears,
  Update,
} from "nestjs-telegraf";
import { Context } from "telegraf";
import { AddressService } from "./address.service";

@Update()
export class AddressUpdate {
  constructor(private readonly addressService: AddressService) {}

  @Command("address")
  async onAddress(@Ctx() ctx: Context) {
    await this.addressService.onAddress(ctx);
  }

  @Hears("Yangi manzil qo'shish")
  async onCommandNewAddress(@Ctx() ctx: Context) {
    await this.addressService.onCommandNewAddress(ctx);
  }

  @Hears("Mening manzillarim")
  async onCommandMyAddresses(@Ctx() ctx: Context) {
    await this.addressService.onCommandMyAddresses(ctx);
  }

  @Action(/^loc_+\d+/)
  async onClickLocation(@Ctx() ctx: Context){
    await this.addressService.onClickLocation(ctx);
  }

  @Action(/^del_+\d+/)
  async onDeleteLocation(@Ctx() ctx: Context){
    await this.addressService.onDeleteLocation(ctx);
  }

  
}
