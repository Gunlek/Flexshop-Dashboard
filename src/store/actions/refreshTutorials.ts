const refreshTutorials = (context) => {
    context.commit("getMachines");
    context.commit("getTutorials");
}

export default refreshTutorials;
