import { createServer, Model } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,

    models: {
      job: Model,
    },

    seeds(server) {
      server.create('job', {
        id: 1,
        title: 'Software Engineer',
        description:
          'Join our team as a software engineer and work on exciting projects. We are looking for a software engineer who is passionate about new technologies and loves teamwork, Contact us!',
        type: 'Full-time',
        publicationDate: '7/13/23',
      });

      server.create('job', {
        id: 2,
        title: 'Product Designer',
        description:
          'We are seeking a talented product designer to create beautiful user experiences. If you have experience detecting new product opportunities in the market, send us your CV so we can contact you.',
        type: 'Part-time',
        publicationDate: '7/6/23',
      });

      server.create('job', {
        id: 3,
        title: 'FrontEnd Developer',
        description:
          'We are seeking a talented and experienced Front-End Developer to join our dynamic development team!. If you have experience with technologies such as React or Angular and have a passion for web development, do not hesitate to apply.',
        type: 'Full-time',
        publicationDate: '6/2/23',
      });

      server.create('job', {
        id: 4,
        title: 'Technical Support Specialist',
        description:
          'We are looking for a highly motivated Technical Support Specialist to join our team. As a Technical Support Specialist, you will be the primary point of contact for our customers, providing technical assistance and resolving software and hardware-related issues.',
        type: 'Part-time',
        publicationDate: '5/9/23',
      });

      server.create('job', {
        id: 5,
        title: 'Backend Developer',
        description:
          'We are currently looking for a talented and motivated Back-End Developer to become a valuable member of our development team. As a Back-End Developer, you will be responsible for designing, developing, and maintaining server-side applications and databases',
        type: 'Full-time',
        publicationDate: '5/3/23',
      });
    },

    routes() {
      this.namespace = '/api';

      this.get('/jobs', (schema) => {
        return schema.jobs.all();
      });
    },
  });

  return server;
}
