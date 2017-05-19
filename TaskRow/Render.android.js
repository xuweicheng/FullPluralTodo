import React from 'react';
import {
    Text,
    TouchableHighlight,
    Image,
    Animated,
    StyleSheet,
} from 'react-native';

export default function render(styles) {
    const doneAnimation = new Animated.ValueXY();
    const component = this;

    const localStyle = StyleSheet.create({
        doneButton: {
            borderRadius: 5,
            padding: 5,
        },
        row: {
            transform: doneAnimation.getTranslateTransform(),
        },
    });

    function animatedPress() {
        Animated.spring(doneAnimation, {
            tension: 2,
            friction: 3,
            toValue: {
                x: -500,
                y: 0,
            }
        }).start();

        setTimeout(() => {
            this.onDonePressed();
        }, 1000);   
    }

    function renderDoneButton(todo) {
        if (todo.state === 'done') {
            return null;
        }
        return (
            <TouchableHighlight
                underlayColor="#ddd"
                onPress={animatedPress.bind(component)}
                style={localStyle.doneButton}
            >
                <Image 
                    source={require('../images/done.png')}
                />
            </TouchableHighlight>
        );
    }

    return (
        <Animated.View style={[styles.container, localStyle.row]}>
            <Text style={styles.label}>
                {this.props.todo.task}
            </Text>
            {renderDoneButton(this.props.todo)}
        </Animated.View>
        
    );
}
