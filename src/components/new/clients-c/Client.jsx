import { toLocalCurrency } from "../../../helpers/global";
import { calcArticlesTotal } from "../../../helpers/articles";
import { ButtonDark } from "../../general/ButtonDark";

export const Client = ({ id = '', name = '', articles = [] }) => {
  return (
    <article id={id}>
      <p className="text-xl">{name}</p>
      {/* <ul>
        {articles.map((article) => (
          <li key={article.id} id={article.id}>{toLocalCurrency(article.price)}</li>
        ))}
      </ul> */}
      <p>{toLocalCurrency(calcArticlesTotal(articles))}</p>
      <div className="flex flex-wrap gap-2">
        <ButtonDark text="Editar" icon="edit" />
        <ButtonDark text="Eliminar" icon="delete" />
        <ButtonDark text="Registro" icon="reorder" />
      </div>
    </article>
  );
}
