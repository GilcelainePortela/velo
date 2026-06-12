import { test, expect } from '@playwright/test'

import { generateOrderCode } from '../support/helpers';
import { number } from 'zod';

///AAA - Arrange, Act, Assert (preparar, agir, verificar)

//ganchos:
//beforeAll	Executa uma vez antes de todos os testes
//beforeEach	Executa antes de cada teste
//afterEach	Executa depois de cada teste
//afterAll	Executa uma vez depois de todos os testes

// Se houver dois testes, a ordem será:
// beforeAll
// beforeEach
// teste 1
// afterEach
// beforeEach
// teste 2
// afterEach
// afterAll

test.describe('Consulta de Pedido', ()=> {

  // test.beforeAll(async () => {
  //   console.log('beforeAll: roda uma vez antes de todos os testes.')
  // })
  
  test.beforeEach(async ({page}) => {
        //Arrange
        await page.goto('http://localhost:5173/')
        await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

        await page.getByRole('link', { name: 'Consultar Pedido' }).click()
        await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
  })
  
  // test.afterEach(async () => {
  //   console.log('afterEach: roda depois de cada teste.')
  // })
  
  // test.afterAll(async () => {
  //   console.log('afterAll: roda uma vez depois de todos os testes.')
  // })

  test('deve consultar um pedido aprovado', async ({ page }) => {

    //Test Data 
    //const order = 'VLO-Q2BENO'

    const order = {
      number: 'VLO-Q2BENO',
      status: 'APROVADO',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'Gilcelaine Portela da Luz',
        email: 'gilce@desenv.com'
      },
      payment: 'À Vista'
    }
  
    //Act
    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number)
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()

    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - img
      - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);
  })

  test('deve consultar um pedido reprovado', async ({ page }) => {

    //Test Data 
    //const order = 'VLO-AI6TCB'
  
    const order = {
      number: 'VLO-AI6TCB',
      status: 'REPROVADO',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Steve Jobs',
        email: 'jobs@apple.com'
      },
      payment: 'À Vista'
    }

    //Act
    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number)
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()
  
  
    //Assert
    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - img
      - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);




  })
  
  test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {
  
    const order = generateOrderCode()
  
    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order)
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()
  
    // await expect(page.locator('#root')).toContainText('Pedido não encontrado', level: 3)
    // await expect(page.locator('#root')).toContainText('Verifique o número do pedido e tente novamente')
  
    // const title = page.getByRole('heading', { name: 'Pedido não encontrado' })
    // await expect(title).toBeVisible()
  
    // // const message = page.locator('//p[text()="Verifique o número do pedido e tente novamente"]')
    // const message = page.locator('p', {hasText: 'Verifique o número do pedido e tente novamente'})
    // await expect(message).toBeVisible()
  
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - img
      - heading "Pedido não encontrado" [level=3]
      - paragraph: Verifique o número do pedido e tente novamente
      `)
  
  })

})

