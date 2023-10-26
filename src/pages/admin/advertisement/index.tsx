import React from 'react';

const Index = () => {
    const loremText = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut urna libero.
    Nunc bibendum libero in justo aliquet, eu consectetur sapien bibendum.
    Maecenas eget dui a quam facilisis suscipit.
    Sed vel ipsum eget dolor sagittis vehicula nec id elit.
    Aliquam erat volutpat. Vestibulum in justo auctor, suscipit nisl eget, tempus tortor.
    `
    const paragraphs = Array.from({ length: 100 }, (_, index) => (
        <p key={index}>{loremText}</p>
    ));
    return (
        <div className={'p-4'}>
            {paragraphs}
        </div>
    );
};

export default Index;