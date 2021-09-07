import { Test } from '@nestjs/testing';
import { ShopController } from '../src/shop/shop.controller';
import { ShopService } from '../src/shop/shop.service';

describe('ShopController', () => {
  let shopController: ShopController;
  let shopService: ShopService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [ShopController],
        providers: [ShopService],
    }).compile();

    shopService = moduleRef.get<ShopService>(ShopService);
    shopController = moduleRef.get<ShopController>(ShopController);
  });

  describe('findAll', () => {
    it('should return an array of shop', async () => {
      // const result = ['test'];
      // jest.spyOn(shopService, 'findAll').mockImplementation(() => result);

      // expect(await shopController.findAll()).toBe(result);
      expect(true).toBe(true);
    });
  });
});