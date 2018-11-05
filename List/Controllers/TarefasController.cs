using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using List.Models;

namespace List.Controllers
{
    public class TarefasController : ApiController
    {
        private lista_tarefasEntities db = new lista_tarefasEntities();

        // GET: api/Tarefas
        public IQueryable<tb_tarefas> Gettb_tarefas()
        {
            return (db.tb_tarefas).Where(x => x.dt_deletado == null);
        }

        // GET: api/Tarefas/5/0
        [Route("api/Tarefas/{id}/{fg_finalizado}")]
        [HttpGet]
        [ResponseType(typeof(tb_tarefas))]
        public async Task<IHttpActionResult> AlternaTb_tarefas(int id, bool fg_finalizado)
        {
            tb_tarefas tb_tarefas = await db.tb_tarefas.FindAsync(id);
            if (tb_tarefas == null)
            {
                return NotFound();
            }

            if (tb_tarefas == null)
            {
                return NotFound();
            }

            if (fg_finalizado && fg_finalizado == tb_tarefas.fg_finalizado)
            {
                tb_tarefas.fg_finalizado = false;
                tb_tarefas.dt_concluido = null;
            }
            else if (!fg_finalizado && fg_finalizado == tb_tarefas.fg_finalizado)
            {
                tb_tarefas.fg_finalizado = true;
                tb_tarefas.dt_concluido = DateTime.Today;
            }

            return await Puttb_tarefas(id, tb_tarefas, "alternar");            
        }

        // PUT: api/Tarefas/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> Puttb_tarefas(int id, tb_tarefas tb_tarefas, string action = "edit")
        {
            if (action == "edit")
            {
                tb_tarefas tb_tarefas_banco = await db.tb_tarefas.FindAsync(id);

                tb_tarefas_banco.ds_descricao = tb_tarefas.ds_descricao;
                tb_tarefas_banco.ds_titulo = tb_tarefas.ds_titulo;
                tb_tarefas_banco.dt_editado = DateTime.Today;

                tb_tarefas = tb_tarefas_banco;
            }
            else if (action == "delete")
                tb_tarefas.dt_deletado = DateTime.Today;
                

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tb_tarefas.id)
            {
                return BadRequest();
            }

            db.Entry(tb_tarefas).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tb_tarefasExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Tarefas
        [ResponseType(typeof(tb_tarefas))]
        public async Task<IHttpActionResult> Posttb_tarefas(tb_tarefas tb_tarefas)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            tb_tarefas.dt_criado = DateTime.Today;

            db.tb_tarefas.Add(tb_tarefas);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = tb_tarefas.id }, tb_tarefas);
        }

        // DELETE: api/Tarefas/5
        [ResponseType(typeof(tb_tarefas))]
        public async Task<IHttpActionResult> Deletetb_tarefas(int id)
        {
            tb_tarefas tb_tarefas = await db.tb_tarefas.FindAsync(id);
            if (tb_tarefas == null)
            {
                return NotFound();
            }

            return await Puttb_tarefas(id, tb_tarefas, "delete");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tb_tarefasExists(int id)
        {
            return db.tb_tarefas.Count(e => e.id == id) > 0;
        }
    }
}