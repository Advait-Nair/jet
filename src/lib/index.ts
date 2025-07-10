
import FocusedSpace from './spaces/FocusedSpace.svelte';
import GenericSpace from './spaces/GenericSpace.svelte';
import Button from './touch/Button.svelte';
import Title from './text/Title.svelte';
import Subtitle from './text/Subtitle.svelte';
import Heading from './text/Heading.svelte';
import Tab from './text/Tab.svelte';
import Category from './text/Category.svelte';
import Divider from './organise/Divider.svelte';
import Aura from './spaces/Aura.svelte';
import PageModifiers from './utils/PageModifiers.svelte';
import Hero from './text/Hero.svelte';
import ButtonDropdown from './touch/ButtonDropdown.svelte';
import Card from './organise/Card.svelte';
import AuraCard from './organise/AuraCard.svelte';
import Aurora from './spaces/Aurora.svelte';
import SaturateSvg from './utils/SaturateSvg.svelte';
import Notify from './utils/Notify.svelte';
import Modal from './utils/Modal.svelte';
import Toggle from './touch/Toggle.svelte';
import Accordion from './organise/Accordion.svelte';
import TextInput from './touch/TextInput.svelte';


const jet = {
    spaces: {
        GenericSpace,
        FocusedSpace,
        Aura,
        Aurora,
    },
    touch: {
        Button,
        Toggle,
        TextInput
    },
    text: {
        Title,
        Hero,
        Subtitle,
        Heading,
        Tab,
        Category,
    },
    organise: {
        Divider,
        Card,
        AuraCard,
        Accordion,
    },
    utils: {
        PageModifiers,
        SaturateSvg,
        Notify,
        Modal,
    }
}

export default jet;