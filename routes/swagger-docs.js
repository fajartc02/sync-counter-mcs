/**
 * @swagger
 * /counter:
 *   get:
 *     summary: All Counter Machines
 *     description: Get all machines with counters
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: array
 *                   example: [{"id": 1,"machine_nm": "IMSP-0053","counter": 17,"updated_dt": "2024-08-11T06:50:49.000Z"}]
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 * /counter/{machine_nm}:
 *   get:
 *     summary: Counter by machine name
 *     description: Get counter by machine name
 *     parameters:
 *       - in: path
 *         name: machine_nm
 *         schema:
 *           type: string
 *         required: true
 *         description: Machine name
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   example: {"id": 1,"machine_nm": "IMSP-0053","counter": 17,"updated_dt": "2024-08-11T06:50:49.000Z"}
 */
