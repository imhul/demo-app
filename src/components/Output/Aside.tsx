import React from 'react';
import { List } from 'antd';
// assets
import { ReactComponent as Decoration } from 'assets/decoration.svg';
import { ReactComponent as CheckboxIcon } from 'assets/checkbox.svg';

interface AcideProps {
    collapsed: boolean;
}

const ListItem = List.Item;
const listData = [
    { title: 'Автоматизация HR' },
    { title: 'Интеграция с job-порталами' },
    { title: 'Оценка персонала' },
    { title: 'Синхронизация с Outlook' },
    { title: 'Безопасность данных' },
    { title: 'Парсинг резюме' },
    { title: 'Мультиязычность' },
    { title: 'Конструктор отчетности' }
];

const Aside: React.FC<AcideProps> = ({ collapsed }) => (
    <aside className={collapsed ? 'collapsed' : ''}>
        {
            collapsed ? (
                <div className="content">
                    <h1>Регистрация пользователя</h1>
                    <p>
                        Заполните информацию о себе, чтобы начать использовать все преимущества платформы
                    </p>
                </div>
            ) : (
                <div className="content">
                    <h1>Войти в аккаунт</h1>
                    <p>
                        Введите ваш E-mail и пароль, чтобы начать
                        использовать все преимущества платформы:
                    </p>
                    <List
                        dataSource={listData}
                        grid={{ gutter: 24, column: 2 }}
                        renderItem={item => (
                            <ListItem>
                                <CheckboxIcon />
                                <span className="white">
                                    {item.title}
                                </span>
                            </ListItem>
                        )} />
                </div>
            )
        }
        <div className="decoration">
            <Decoration />
        </div>
    </aside>
);

export default Aside;
