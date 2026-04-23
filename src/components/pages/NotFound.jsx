import Button from "../ui/common/Button/Button";
import Section from "../ui/common/Section";

export default function NotFound() {
  return (
    <Section className="notfound">

        <h1>404</h1>

        <h2 className="title">
          Упс! Что-то пошло не так
        </h2>

        <p className="text-base">
          Похоже, вы сделали неправильный шаг.
          Такой страницы не существует.
        </p>

        <Button to="/" variant="outline">На главную</Button>
    </Section>
  );
}