import { test, expect } from '@playwright/test'

///AAA - Arrange, Act, Assert (preparar, agir, verificar)

test('deve consultar um pedido aprovado', async ({ page }) => {
  //Arrange
  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  //Act
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-Q2BENO')
  // await page.getByTestId('search-order-button').click()
  //await page.locator('//button[text()="Buscar Pedido"]').click()
  await page.getByRole('button', { name: 'Buscar Pedido' }).click()


  //Assert
  // await expect(page.getByTestId('order-result-id')).toBeVisible({timeout: 10_000})
  // await expect(page.getByTestId('order-result-id')).toContainText('VLO-Q2BENO')
  await expect(page.locator('div').filter({ hasText: /^PedidoVLO-Q2BENO$/ }).first()).toBeVisible()
  await expect(page.getByTestId('order-result-VLO-Q2BENO')).toContainText('VLO-Q2BENO')


  // await expect(page.getByTestId('order-result-status')).toBeVisible()
  // await expect(page.getByTestId('order-result-status')).toContainText('APROVADO')
  await expect(page.getByText('APROVADO')).toBeVisible()
  await expect(page.getByTestId('order-result-VLO-Q2BENO')).toContainText('APROVADO')


})