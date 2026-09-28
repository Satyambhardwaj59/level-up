import {
  getDashboard,
  getTopProducts
} from "../services/analyticsService.js";

export async function dashboard(req, res) {
  const data = await getDashboard();

  res.json({
    success: true,
    data
  });
}

export async function topProducts(req, res) {
  const data = await getTopProducts();

  res.json({
    success: true,
    data
  });
}